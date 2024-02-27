import { useState } from "react";
import "./AddTrip.css";
import Modal from "../modal/Modal";

function AddTrip() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div onClick={openModal} className="add-trip">
        {" "}
        <span className="plus">+</span>
        <br /> <span className="text">Add Trip</span>
      </div>
      {modalVisible && <Modal setModalVisible={setModalVisible}/>}
    </>
  );
}

export default AddTrip;
