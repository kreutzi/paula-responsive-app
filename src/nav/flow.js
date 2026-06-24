// Role-scoped observation flow. Each role records at a different depth in the
// same house: farm staff capture in-house signs; doctors capture post-mortem
// lesions plus the daily medication given. Both finish with notes + review.

export const FLOW = {
  farm: ['signs', 'notes', 'summary'],
  doctor: ['lesions', 'medication', 'notes', 'summary'],
};

export const STEP_LABELS = {
  farm: ['signLabel', 'notesLabel', 'review'],
  doctor: ['lesionLabel', 'medsLabel', 'notesLabel', 'review'],
};

// First screen of the observation flow for a role (used by "Start observation").
export const firstFlowRoute = (role) => (role === 'doctor' ? 'lesions' : 'signs');

// The screen after `route` in a role's flow, or null at the end.
export const nextFlowRoute = (role, route) => {
  const seq = FLOW[role] || FLOW.farm;
  const i = seq.indexOf(route);
  return i >= 0 && i < seq.length - 1 ? seq[i + 1] : null;
};
