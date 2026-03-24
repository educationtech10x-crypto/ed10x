<?php
declare(strict_types=1);

/**
 * Runs after `composer install` on Hostinger (or locally).
 * If Node.js is available, rebuilds `www/` from source. Otherwise the deploy uses
 * the `www/` directory committed to Git (run `npm run build:deploy` before pushing).
 */

$root = dirname(__DIR__);
chdir($root);

$isWindows = defined('PHP_OS_FAMILY') && PHP_OS_FAMILY === 'Windows';

if ($isWindows) {
    exec('where node 2>nul', $_, $nodeCode);
} else {
    exec('command -v node 2>/dev/null', $_, $nodeCode);
}

$hasNode = $nodeCode === 0;

if (!$hasNode) {
    fwrite(STDERR, "[ed10x] Node.js not in PATH — skipping npm build. Serving pre-built www/ from Git.\n");
    exit(0);
}

passthru('npm ci', $npmCi);
if ($npmCi !== 0) {
    fwrite(STDERR, "[ed10x] npm ci failed.\n");
    exit(1);
}

passthru('npm run build', $build);
if ($build !== 0) {
    fwrite(STDERR, "[ed10x] npm run build failed.\n");
    exit(1);
}

passthru('node scripts/sync-www.mjs', $sync);
if ($sync !== 0) {
    fwrite(STDERR, "[ed10x] sync www/ failed.\n");
    exit(1);
}

fwrite(STDERR, "[ed10x] Rebuilt www/ successfully.\n");
exit(0);
