import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
	fetchBatches,
	updateBatchByName,
	updateTimetableByVersion,
} from "../../../database/dataAccess";

function EditTimetable(props) {
	const [timetableVersionName, setTimetableVersionName] = useState(
		props.timetable.timetableVersionName
	);
	const [batches, setBatches] = useState(props.timetable.batches);

	const [batchList, setBatchList] = useState([]);
	const [showLoadingOverlay, setLoadingOverlay] = useState(false);

	useEffect(() => {
		setLoadingOverlay(true);
		fetchBatches().then((list) => {
			setBatchList(list);
			setLoadingOverlay(false);
		});
	}, []);

	const handleBatchEdit = () => {
		let editedTimetable = {
			timetableVersionName: timetableVersionName,
			batches: batches,
		};
		updateTimetableByVersion(editedTimetable).then(() => {
			props.closeDialog();
		});
	};

	const handleCheckBox = (e) => {
        let newBatches = batches
		if(e.target.checked){
            if(newBatches.includes(e.target.id) === false){
                newBatches.push(e.target.id)
            }
        }else {
            const index = newBatches.indexOf(e.target.id);
            if (index > -1) {
                newBatches.splice(index, 1);
            }
        }
        setBatches(newBatches)
	};

	return (
		<Modal show={true} onHide={props.closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Add/Update Timetable</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="textTimetableName">
						<Form.Label column sm="2">
							Timetable Name
						</Form.Label>
						{props.addTimetable ? (
							<Col sm="10">
								<Form.Control
									type="text"
									placeholder=""
									value={timetableVersionName}
									onChange={(e) => {
										setTimetableVersionName(e.target.value);
									}}
								/>
							</Col>
						) : (
							<Col sm="10">
								<Form.Control
									plaintext
									readOnly
									defaultValue={timetableVersionName}
								/>
							</Col>
						)}
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="textBatchSize">
						<Form.Label column sm="2">
							Select Batches
						</Form.Label>
					</Form.Group>
					{batchList.map((batch, index) => (
						<Form.Check
							type="checkbox"
							label={batch.batchName}
							onChange={handleCheckBox}
							//checked={batches.includes(batch.batchName)}
							id={batch.batchName}
							key={batch.batchName}
						/>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.closeDialog}>
					Close
				</Button>
				<Button variant="primary" onClick={handleBatchEdit}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditTimetable;
