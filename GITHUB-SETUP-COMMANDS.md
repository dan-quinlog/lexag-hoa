# GitHub Setup Commands

After creating the repository on GitHub, run these commands:

## Connect Local Repository to GitHub

```bash
# Navigate to project directory
cd "c:/outterspacebar/lexag-root/front end/lexag"

# Add GitHub as remote origin (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/lexag-hoa.git

# Verify remote was added
git remote -v

# Push all branches to GitHub
git push -u origin main
git push -u origin staging
git push -u origin dev

# Currently on dev branch, so set upstream
git push -u origin dev
```

## Alternative: Use SSH (if you have SSH keys set up)

```bash
# If you prefer SSH over HTTPS
git remote add origin git@github.com:YOUR-USERNAME/lexag-hoa.git
git push -u origin --all
```

## Verify Everything Worked

```bash
# Check remote configuration
git remote -v
# Should show:
# origin  https://github.com/YOUR-USERNAME/lexag-hoa.git (fetch)
# origin  https://github.com/YOUR-USERNAME/lexag-hoa.git (push)

# Check branch status
git branch -r
# Should show all remote branches

# Verify on GitHub
# Go to https://github.com/YOUR-USERNAME/lexag-hoa
# You should see:
# - All your code and files
# - Beautiful README with project description
# - Multiple branches (main, staging, dev)
# - All your commit history
```

## If You Get Permission Errors

1. **Check GitHub Credentials**:
   ```bash
   git config --global user.name "Daniel"
   git config --global user.email "dan.quinlog@gmail.com"
   ```

2. **Use Personal Access Token** (if needed):
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with repo permissions
   - Use token as password when prompted

## Repository Settings (After Creation)

1. **Go to repository Settings → Branches**
2. **Add branch protection rule for `main`**:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

3. **Set default branch to `dev`** for active development

## Next Steps

After repository is set up:
- [ ] Repository is visible in your GitHub account
- [ ] All code and history preserved
- [ ] Automatic backup enabled
- [ ] Ready for collaboration with board members
- [ ] Can proceed with backend development
