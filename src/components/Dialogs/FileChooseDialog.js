import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function FileChooseDialog(props){

    const [csvFile, setCsvFile] = useState();

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);

        for(let i=0;i<headers.length;i++){
            headers[i] = headers[i].replace('\r','').trim()
        }

        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            if(row !== ""){
                console.log("row= ",row);
                row = row.replace('\r','');
                const values = row.split(delim);
                const eachObject = headers.reduce((obj, header, i) => {
                    obj[header] = values[i];
                    return obj;
                }, {})
                return eachObject;
            }
        })

        return newArray;
    }

    const handleUploadData = ()=>{
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            const json = processCSV(text);
            console.log(json);
            props.uploadData(json)
        }

        reader.readAsText(file);
    };

    return(
        
        <Modal show={true} onHide={props.closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>Select CSV File</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} className="mb-3" controlId="textCsvName">
                    
                            <Col sm="10">
										<Form.Control
											type="file"
                                            accept=".csv"
											onChange={(e) => {
												setCsvFile(e.target.files[0]);
											}}
										/>
									</Col>
													
						</Form.Group>
					
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.closeDialog}>
						Close
					</Button>
					<Button variant="primary" onClick={handleUploadData}>
						Upload Data
					</Button>
				</Modal.Footer>
			</Modal>
    );
}

export default FileChooseDialog;