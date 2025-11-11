# OpenAgentHub Customizations

This directory contains a customized version of [Open WebUI](https://github.com/open-webui/open-webui) for the OpenAgentHub project.

## Branch Strategy

This submodule uses a custom branch called `openagenthub-custom` that branches from the main Open WebUI repository. This allows us to:

- Maintain all Agent Library customizations in a dedicated branch
- Keep the ability to pull upstream updates from the main Open WebUI project
- Track modifications separately from the upstream repository

## Current Branch

**Branch**: `openagenthub-custom`  
**Base**: `main` branch from upstream  
**Purpose**: Contains all OpenAgentHub-specific modifications

## Modifications

### Customizations Made

_This section will be updated as modifications are made to the Open WebUI codebase._

Currently, no customizations have been applied. This branch is ready for OpenAgentHub-specific modifications.

### Planned Customizations

- Agent Library integration
- Custom UI components for agent management
- Integration with OpenAgentHub's agent registry
- Custom authentication/authorization if needed
- Additional features specific to OpenAgentHub's use case

## Updating from Upstream

To pull the latest changes from the upstream Open WebUI repository:

### 1. Navigate to the submodule directory

```bash
cd open-webui-source
```

### 2. Fetch upstream changes

```bash
git fetch upstream
```

### 3. Check what's new

```bash
git log HEAD..upstream/main --oneline
```

### 4. Merge upstream changes into your custom branch

```bash
git checkout openagenthub-custom
git merge upstream/main
```

### 5. Resolve any conflicts

If there are merge conflicts, resolve them manually:

```bash
# After resolving conflicts
git add .
git commit -m "Merge upstream/main into openagenthub-custom"
```

### 6. Push your updated branch

```bash
git push origin openagenthub-custom
```

### 7. Return to the main repository

```bash
cd ..
```

### 8. Update the submodule reference in the main repository

```bash
git add open-webui-source
git commit -m "Update Open WebUI submodule to latest upstream"
git push
```

## Alternative: Rebase Strategy

If you prefer to rebase instead of merge (for a cleaner history):

```bash
cd open-webui-source
git fetch upstream
git checkout openagenthub-custom
git rebase upstream/main
# Resolve any conflicts if needed
git push origin openagenthub-custom --force-with-lease
cd ..
git add open-webui-source
git commit -m "Update Open WebUI submodule (rebased)"
git push
```

**Note**: Use `--force-with-lease` instead of `--force` for safer force pushing. Only rebase if you're the only one working on this branch.

## Tracking Changes

### Viewing Customizations

To see what has been modified from upstream:

```bash
cd open-webui-source
git diff upstream/main...openagenthub-custom
```

### Viewing Recent Commits

```bash
cd open-webui-source
git log --oneline --graph --decorate --all
```

## Remote Configuration

- **origin**: Points to the Open WebUI repository (used for pushing customizations if you have write access, or your fork)
- **upstream**: Points to the official Open WebUI repository (used for pulling updates)

To view remotes:

```bash
cd open-webui-source
git remote -v
```

## Best Practices

1. **Document all changes**: Update this file whenever you make significant modifications
2. **Test after updates**: Always test your customizations after merging upstream changes
3. **Keep commits atomic**: Make focused commits that are easy to review and revert
4. **Regular updates**: Periodically merge upstream changes to stay current with bug fixes and features
5. **Backup before major merges**: Consider creating a backup branch before major upstream merges

## Troubleshooting

### Submodule shows as modified when it shouldn't

If the submodule appears modified in the main repository:

```bash
cd open-webui-source
git status
# If you're on the correct branch and there are no changes, return to main repo
cd ..
git submodule update --init --recursive
```

### Need to reset to upstream state

If you need to discard all customizations and start fresh:

```bash
cd open-webui-source
git fetch upstream
git reset --hard upstream/main
git checkout -B openagenthub-custom
```

### Submodule not updating

If the submodule reference isn't updating in the main repository:

```bash
git submodule update --remote open-webui-source
```

## Resources

- [Open WebUI Repository](https://github.com/open-webui/open-webui)
- [Open WebUI Documentation](https://docs.openwebui.com/)
- [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [OpenAgentHub Main Repository](../README.md)

---

**Last Updated**: $(date)  
**Current Upstream Version**: Check with `git log -1 upstream/main --oneline` in the submodule directory

