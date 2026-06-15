import { create } from 'zustand';

export const TAB_ROOT = { home: 'home', visits: 'visits', alerts: 'alerts', settings: 'settings' };

// In-memory navigation stack (push/pop), tabs, and modal sheets.
export const useNav = create((set, get) => ({
  stack: [{ route: 'splash', params: {} }],
  tab: 'home',
  sheet: null,        // { type, params }
  dir: 'fwd',

  current: () => get().stack[get().stack.length - 1],

  push: (route, params = {}) => set((s) => ({ stack: [...s.stack, { route, params }], dir: 'fwd', sheet: null })),
  replace: (route, params = {}) => set((s) => ({ stack: [...s.stack.slice(0, -1), { route, params }], dir: 'fwd', sheet: null })),
  pop: () => set((s) => (s.stack.length > 1 ? { stack: s.stack.slice(0, -1), dir: 'back', sheet: null } : {})),
  popTo: (route) => set((s) => {
    const i = s.stack.map((x) => x.route).lastIndexOf(route);
    return i >= 0 ? { stack: s.stack.slice(0, i + 1), dir: 'back', sheet: null } : {};
  }),
  // reset the whole stack (used after sign-in / sign-out / submit-home)
  resetTo: (route, tab = 'home') => set({ stack: [{ route, params: {} }], tab, dir: 'fwd', sheet: null }),

  switchTab: (tab) => set({ tab, stack: [{ route: TAB_ROOT[tab], params: {} }], dir: 'fwd', sheet: null }),

  openSheet: (type, params = {}) => set({ sheet: { type, params } }),
  closeSheet: () => set({ sheet: null }),
}));
