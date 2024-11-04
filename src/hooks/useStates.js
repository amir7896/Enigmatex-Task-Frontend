import React, { createContext, useContext, useState } from "react";

const authContext = createContext();
export function ProvideStates({ children }) {
  const auth = useProvideStates();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useStates = () => {
  return useContext(authContext);
};

function useProvideStates() {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  return {
    tasks,
    setTasks,
    openDialog,
    setOpenDialog,
    taskTitle,
    setTaskTitle,
    confirmOpen,
    setConfirmOpen,
  };
}
