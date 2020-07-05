# Auto assign owner action

This action adds the owner of pull request as assignee if not already present

## Inputs

### `github-token`

**Required** Github token

## Example usage

uses: danielswensson/auto-assign-owner-action@v1
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
