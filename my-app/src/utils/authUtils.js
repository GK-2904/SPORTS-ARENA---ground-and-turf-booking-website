// Authentication utility functions for localStorage management

export const saveUserToStorage = (userData) => {
  try {
    console.log('Saving user to storage:', userData);
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    console.log('Users in storage after save:', existingUsers);
    return true;
  } catch (error) {
    console.error('Error saving user to storage:', error);
    return false;
  }
};

export const getUserFromStorage = (email) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('All users in storage:', users);
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    console.log('Found user:', user);
    return user;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

export const setCurrentUser = (userData) => {
  try {
    console.log('Setting current user:', userData);
    const currentUserData = {
      ...userData,
      isLoggedIn: true,
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    // Ensure compatibility with components checking this flag
    localStorage.setItem('isLoggedIn', 'true');
    console.log('Current user set successfully');
    return true;
  } catch (error) {
    console.error('Error setting current user:', error);
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('currentUser');
    const parsedUser = user ? JSON.parse(user) : null;
    console.log('Getting current user:', parsedUser);
    return parsedUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logoutUser = () => {
  try {
    console.log('Logging out user');
    localStorage.removeItem('currentUser');
    // Keep explicit flag for components that read it
    localStorage.setItem('isLoggedIn', 'false');
    console.log('User logged out successfully');
    return true;
  } catch (error) {
    console.error('Error logging out user:', error);
    return false;
  }
};

export const isUserLoggedIn = () => {
  const currentUser = getCurrentUser();
  const isLoggedIn = currentUser && currentUser.isLoggedIn;
  console.log('Checking if user is logged in:', isLoggedIn);
  return isLoggedIn;
};

export const clearAllUsers = () => {
  try {
    console.log('Clearing all users from storage');
    localStorage.removeItem('users');
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    console.log('All users cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing users:', error);
    return false;
  }
};

// Debug function to show all localStorage data
export const debugLocalStorage = () => {
  try {
    const users = localStorage.getItem('users');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('=== LocalStorage Debug Info ===');
    console.log('Users:', users ? JSON.parse(users) : 'No users found');
    console.log('Current User:', currentUser ? JSON.parse(currentUser) : 'No current user');
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('==============================');
    
    return {
      users: users ? JSON.parse(users) : [],
      currentUser: currentUser ? JSON.parse(currentUser) : null,
      allKeys: Object.keys(localStorage)
    };
  } catch (error) {
    console.error('Error debugging localStorage:', error);
    return null;
  }
};
