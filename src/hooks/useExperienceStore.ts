import { create } from 'zustand';

type ExperienceState = {
  sectionIndex: number;
  setSectionIndex: (index: number) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  sectionIndex: 0,
  setSectionIndex: (sectionIndex) => set({ sectionIndex })
}));
