# TN smart tourism — Pre-commit hook guidance

## Purpose

This hook ensures code quality and scope discipline before every commit.

## Checks to enforce

### 1. TypeScript compilation
```bash
npx tsc --noEmit
```
Commit MUST fail if TypeScript compilation fails.

### 2. Lint
```bash
npx eslint src/ --max-warnings=0
```
Commit MUST fail if any ESLint warnings or errors exist.

### 3. Unit tests
```bash
npx jest --passWithNoTests
```
Commit MUST fail if unit tests fail.

### 4. Scope audit — sensitive data check
Grep source files for patterns that would indicate real credential handling:
```bash
grep -rn --include="*.ts" --include="*.tsx" \
  -e "cardNumber" -e "cvv" -e "upiPin" -e "passportNumber" \
  -e "realKyc" -e "biometric" \
  src/
```
Commit MUST fail if any of these patterns appear in non-test, non-comment code.

### 5. README synchronisation reminder
If files under `src/` are changed, prompt the developer to verify `README.md` is current.

### 6. Demo disclaimer check
Any new screen component that handles payment MUST include the trust statement:
> "Prototype simulation — no real payment is processed."

---

## Implementation note

Configure via `husky` + `lint-staged` in `package.json`:

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["eslint --max-warnings=0", "tsc --noEmit"]
  }
}
```
