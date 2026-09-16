export type tasktype = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: 'Pending' | 'Completed';
  description: string;
};

export const taskdata: tasktype[] = [
  { id: 'task-1', title: 'Build StudyFlow screens', subject: 'CCE 106', due: 'October 10, 2026', status: 'Pending', description: 'Create the dashboard, tasks, details, and profile screens.' },
  { id: 'task-2', title: 'Network topology activity', subject: 'IT 11', due: 'October 12, 2026', status: 'Completed', description: 'Submit the completed network topology diagram.' },
  { id: 'task-3', title: 'System integration report', subject: 'IT 12', due: 'October 15, 2026', status: 'Pending', description: 'Write a short report about system integration architecture.' },
  { id: 'task-4', title: 'Professional ethics reflection', subject: 'IT 17', due: 'October 18, 2026', status: 'Pending', description: 'Prepare a reflection on professional issues in IT.' },
  { id: 'task-5', title: 'React Native review', subject: 'CCE 106', due: 'October 8, 2026', status: 'Completed', description: 'Review components, props, state, and navigation.' },
];
