# LocalStorage Authentication System

This document explains how the localStorage authentication system works in the Sports Arena application.

## Overview

The application now properly stores user registration details in localStorage and manages user sessions. Users can register, login, and logout with their data persisted in the browser's localStorage.

## How It Works

### 1. User Registration
- When a user registers, their information is stored in two places:
  - `users` array in localStorage (contains all registered users)
  - `currentUser` object in localStorage (contains the currently logged-in user)

### 2. User Login
- Login validates credentials against the stored users
- Creates a new session in `currentUser`
- Redirects to the booking page

### 3. User Logout
- Removes the `currentUser` from localStorage
- Updates the navigation to show login/register options

## Data Structure

### Users Array
```javascript
[
  {
    id: "1234567890",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    registeredAt: "2024-01-01T00:00:00.000Z"
  }
]
```

### Current User
```javascript
{
  id: "1234567890",
  name: "John Doe",
  email: "john@example.com",
  isLoggedIn: true,
  lastLogin: "2024-01-01T00:00:00.000Z"
}
```

## Files Modified

1. **`src/FrontEnd/Register.jsx`** - Added localStorage storage functionality
2. **`src/FrontEnd/Login.jsx`** - Added localStorage authentication
3. **`src/FrontEnd/Nav2.jsx`** - Added user session management and logout
4. **`src/utils/authUtils.js`** - Created utility functions for localStorage operations
5. **`src/CSS/Nav2.module.css`** - Added styles for user info and logout button

## Troubleshooting

### Debug localStorage
- Use the "Debug localStorage" button on the Register page
- Check the browser console for detailed information
- Verify that data is being stored correctly

### Common Issues
1. **Data not saving**: Check if localStorage is enabled in the browser
2. **Login not working**: Verify that users are being saved correctly
3. **Session not persisting**: Check if `currentUser` is being set properly

### Browser Developer Tools
1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Look for localStorage entries
4. Check for any JavaScript errors in the Console tab

## Security Notes

- Passwords are stored in plain text (not recommended for production)
- Consider implementing proper password hashing
- Add input validation and sanitization
- Implement proper session management

## Testing

1. Register a new user
2. Check localStorage in Developer Tools
3. Try logging in with the same credentials
4. Verify that the navigation shows the user's name
5. Test logout functionality
6. Verify that the session is properly cleared

## Future Improvements

- Add password hashing
- Implement session expiration
- Add "Remember Me" functionality
- Add password reset functionality
- Implement proper error handling
- Add user profile management


