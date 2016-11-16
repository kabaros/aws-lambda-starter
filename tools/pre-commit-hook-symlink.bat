REM Please run this script as adminsitrator to isnstall the git pre-commit hooks. (afer npm installing)
REM This manual step is needed because in Windows, the package is unable to create the symlinks from .git folder without running as admin
node node_modules\pre-commit\install.js