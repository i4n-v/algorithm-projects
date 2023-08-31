import { useContext } from "react";
import { createPortal } from "react-dom";
import { NotifierContext } from "../../contexts/NotifierContext";
import useNotifier from "../../hooks/useNotifier";
import { Notifier } from "../../components";

const GlobalNotifier = () => {
  const [notifierState] = useContext(NotifierContext);
  const { closeNotify } = useNotifier();

  const portalElement = document.getElementById("root");

  return createPortal(
    <Notifier
      open={notifierState.show}
      message={notifierState.message}
      severity={notifierState.severity}
      timeToClose={notifierState.seconds}
      onClose={closeNotify}
    />,
    portalElement
  );
};

export default GlobalNotifier;
