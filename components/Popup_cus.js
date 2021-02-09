import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import styles from "../styles/Popup.module.css";

export default function Popup_cus({ title, fresh, setfre }) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState();
  const [laoding, setLoading] = useState(2);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = async () => {
    setLoading(0);
    const res = await fetch(`/api/add?name=${input}`);
    setLoading(2);
    setfre(true);
    setInput();
    handleClose();
  };
  return (
    <>
      <Button
        variant="outline-primary"
        className={styles.join_btn}
        style={{ color: "#fff" }}
        onClick={handleShow}
      >
        {title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Now </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Summoner Name"
              aria-label="Summoner Name"
              aria-describedby="basic-addon2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={() => handleAdd()}>
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <p>{laoding === 0 && "Loading ..."} </p>
          <p>{laoding === 1 && "Done !"} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
