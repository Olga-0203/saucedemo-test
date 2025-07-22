export interface UserData {
  username: string;
  locked: boolean;
  errorText?: string;
}

export const usersData: UserData[] = [
  { username: 'standard_user', locked: false },
  { username: 'locked_out_user', locked: true, errorText: 'Sorry, this user has been locked out.' },
  { username: 'problem_user', locked: false },
  { username: 'performance_glitch_user', locked: false },
  { username: 'error_user', locked: false },
  { username: 'visual_user', locked: false },
];


//HW5-1