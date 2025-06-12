# Navbar Troubleshooting Guide

## Issue: Navbar not changing when logging in/out

### Step 1: Clear Browser Cache
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or press Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Step 2: Check Console for Errors
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Check for any warnings

### Step 3: Clear All Storage
1. Open Developer Tools (F12)
2. Go to Application tab
3. Click on "Storage" in the left sidebar
4. Click "Clear site data"
5. Refresh the page

### Step 4: Check SessionStorage
1. Open Developer Tools (F12)
2. Go to Application tab
3. Click on "Session Storage" in the left sidebar
4. Check if there's any data in sessionStorage
5. If there's old data, clear it manually

### Step 5: Test Login Flow
1. Clear all data using the "Clear Data" button in the navbar
2. Try logging in as a student
3. Check if the navbar changes to show student navigation
4. Logout and try logging in as a mentor
5. Check if the navbar changes to show mentor navigation

### Step 6: Check Console Logs
The App.jsx now has console logs. Check the browser console for:
- "App useEffect - checking sessionStorage"
- "Saved user from sessionStorage: ..."
- "Current user state: ..."
- "Current activeForm: ..."

### Step 7: Manual Testing
1. Open browser console
2. Run these commands manually:
```javascript
// Check current sessionStorage
console.log('User:', sessionStorage.getItem('user'));
console.log('Login time:', sessionStorage.getItem('loginTime'));

// Clear sessionStorage
sessionStorage.clear();

// Refresh page
location.reload();
```

### Step 8: Check Network Tab
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try logging in
4. Check if there are any failed requests
5. Look for 401, 403, or 500 errors

## Expected Behavior

### Before Login
- Navbar shows: Login, Student, Mentor buttons
- No user information displayed

### After Student Login
- Navbar shows: Welcome [Name] (student)
- Navigation buttons: Home, Dashboard, Schedule, Profile
- Logout and Clear Data buttons

### After Mentor Login
- Navbar shows: Welcome [Name] (mentor)
- Navigation buttons: Home, Dashboard, Profile
- Logout and Clear Data buttons

### After Logout
- Navbar returns to guest state
- Shows: Login, Student, Mentor buttons

## Common Issues and Solutions

### Issue 1: Navbar stuck in guest state
**Solution**: Clear sessionStorage and refresh

### Issue 2: Navbar shows wrong user type
**Solution**: Clear all data and login again

### Issue 3: Navigation buttons not working
**Solution**: Check for JavaScript errors in console

### Issue 4: Styling issues
**Solution**: Check if Bootstrap CSS is loaded properly

## Debug Commands

Add these to browser console for debugging:

```javascript
// Check current state
console.log('User:', JSON.parse(sessionStorage.getItem('user') || 'null'));
console.log('Active form:', document.querySelector('.navbar').textContent);

// Force logout
sessionStorage.clear();
location.reload();

// Test login (replace with actual data)
sessionStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'Test Mentor',
  email: 'mentor@test.com',
  userType: 'mentor'
}));
location.reload();
```

## If Still Not Working

1. **Check React DevTools**: Install React Developer Tools extension and check component state
2. **Check for Multiple React Versions**: Ensure only one React version is loaded
3. **Check for CSS Conflicts**: Ensure no CSS is hiding the navbar
4. **Check for JavaScript Errors**: Look for any syntax errors or runtime errors

## Contact Support

If the issue persists, please provide:
1. Browser console logs
2. Network tab screenshots
3. Steps to reproduce the issue
4. Browser and version information 