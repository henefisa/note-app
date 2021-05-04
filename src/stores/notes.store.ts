import { ipcRenderer } from "electron";
import { Subject } from "rxjs";

const subject = new Subject();

let notes: any = [];

export const notesStore = {
  init: async () => {
    const res = await ipcRenderer.invoke("get-all-notes");
    notes = res || [];
    subject.next(notes);
  },
  subscribe: (setState) => subject.subscribe(setState),
  newNote: async () => {
    const note = await ipcRenderer.invoke("new-note");
    notes = [...notes, note];
    subject.next(notes);
  },
  deleteNote: async (id: string) => {
    await ipcRenderer.invoke("delete-note", { id });
    notes = notes.filter((note) => note.id !== id);
    subject.next(notes);
  },
  editNote: async ({ id, content }: { id: string; content: string }) => {
    await ipcRenderer.invoke("update-note", { id, content });
    notes = notes.map((note) => (note.id === id ? { ...note, content } : note));
    subject.next(notes);
  },
};
