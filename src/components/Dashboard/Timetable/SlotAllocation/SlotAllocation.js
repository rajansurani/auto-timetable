
import { addCourseAllocation, deleteCourseAllocationById, deleteCourseByCode, fetchCourseAllocation, fetchCourses, fetchSlotAllocation, fetchTimetableByVersion, updateCourseByCode } from "../../../../database/dataAccess";
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../../../UiKitComponents/Card";
import LoadingOverlay from "react-loading-overlay";
import { Modal } from "react-bootstrap";
import FileChooseDialog from "../../../Dialogs/FileChooseDialog";
import EditSlotAllocation from "./EditSlotAllocation";

function SlotAllocation(props){

    const [slotAllocationList, setSlotAllocationList] = useState([]);
	const [showLoadingOverlay, setLoadingOverlay] = useState(false);
	const [selectedSlotAllocation, selSelectedSlotAllocation] = useState({});
    const [timetable, setTimetable] = useState({});
    const timetableVersion = props.match.params.version;

	useEffect(() => {
		updateSlotAllocationList();
        fetchTimetableByVersion(timetableVersion).then((tt)=>{
            setTimetable(tt);
            console.log(timetable)
        });
	}, []);

	const updateSlotAllocationList = () => {
		setLoadingOverlay(true);
		fetchSlotAllocation(timetableVersion).then((slotAllocations) => {
			setSlotAllocationList(slotAllocations);
			setLoadingOverlay(false);
		});
	};

	const handleSlotAllocationDelete = () => {
		deleteCourseAllocationById(selectedSlotAllocation.allocationId).then(() => {
			updateSlotAllocationList();
			handleCloseDeleteDialog();
		});
	};

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const [showEditDialog, setShowEditDialog] = useState(false);

	const handleCloseEditDialog = () => {
		setShowEditDialog(false);
		updateSlotAllocationList();
	};
	const handleShowEditDialog = () => setShowEditDialog(true);

	const [dialogTypeAdd, setDialogTypeAdd] = useState(false);
	const [fileChooserDialog, setFileChooserDialog] = useState(false);

	const hanldeCsvDataUpload =(jsonData)=>{
		setFileChooserDialog(false);
		setLoadingOverlay(true);
		console.log("data=",jsonData);
		jsonData.map((data)=>{
			if(data)
				addCourseAllocation(data);
		})
		setLoadingOverlay(false);
		updateSlotAllocationList();
	}

    return(
        <div>
			<LoadingOverlay
				active={showLoadingOverlay}
				spinner
				text="Loading Course Allocations...">
				<Row>
					<Col sm="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<div className="header-title">
									<h4 className="card-title">Slot Alloction for {timetableVersion}</h4>
								</div>
								<div className="d-grid gap-2 d-md-flex justify-content-md-end">
									<Button
										variant="primary"
										className="p-2"
										onClick={() => {
											setDialogTypeAdd(true);
											selSelectedSlotAllocation({
												batchName: "",
												courseCode: "",
                                                facultyCode:"",
                                                practicalBatch:"",
												classroom: "",
												startTime: "",
												endTime: "",
                                                day:"",
											});
											setShowEditDialog(true);
										}}>
										<span>
											<svg
												width="20"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"></path>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"></path>
												<path
													d="M19.2036 8.66919V12.6792"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"></path>
												<path
													d="M21.2497 10.6741H17.1597"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"></path>
											</svg>
										</span>{" "}
										Add Course Allocation
									</Button>{" "}
									<Button variant="primary" className="p-2"
									onClick={() => {
										setFileChooserDialog(true);
									}}>
										<span>
											<svg
												width="20"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													opacity="0.4"
													d="M6.447 22C3.996 22 2 19.9698 2 17.4755V12.5144C2 10.0252 3.99 8 6.437 8L17.553 8C20.005 8 22 10.0302 22 12.5256V17.4846C22 19.9748 20.01 22 17.563 22H16.623H6.447Z"
													fill="currentColor"></path>
												<path
													d="M11.455 2.22103L8.54604 5.06682C8.24604 5.36094 8.24604 5.83427 8.54804 6.12742C8.85004 6.41959 9.33704 6.41862 9.63704 6.12547L11.23 4.56623V6.06119V14.4515C11.23 14.8654 11.575 15.2014 12 15.2014C12.426 15.2014 12.77 14.8654 12.77 14.4515V4.56623L14.363 6.12547C14.663 6.41862 15.15 6.41959 15.452 6.12742C15.603 5.98036 15.679 5.78849 15.679 5.59566C15.679 5.40477 15.603 5.21291 15.454 5.06682L12.546 2.22103C12.401 2.07981 12.205 1.99995 12 1.99995C11.796 1.99995 11.6 2.07981 11.455 2.22103Z"
													fill="currentColor"></path>
											</svg>
										</span>{" "}
										Add from CSV
									</Button>
								</div>
							</Card.Header>
							<Card.Body className="px-0">
								<div className="table-responsive">
									<table
										id="user-list-table"
										className="table table-striped"
										role="grid"
										data-toggle="data-table">
										<thead>
											<tr className="ligth">
												<th>Batch Name</th>
												<th>Course Code</th>
												<th>Faculty Code</th>
												<th>Practical Batch</th>
                                                <th>Classroom</th>
												<th>Day</th>
												<th>Start Time</th>
												<th>End Time</th>
												<th min-width="100px">Action</th>
											</tr>
										</thead>
										<tbody>
											{slotAllocationList.map((item, idx) => (
												<tr key={idx}>
													<td>
														{item.batchName}
													</td>
													<td>{item.courseCode}</td>
													<td>{item.facultyCode}</td>
                                                    <th>{item.practicalBatch}</th>
                                                    <td>
														{item.classroom}
													</td>
													<td>{item.day}</td>
													<td>{item.startTime}</td>
													<td>{item.endTime}</td>
													<td>
														<div className="flex align-items-center list-user-action">
															<Button
																className="btn btn-sm btn-icon btn-warning"
																data-toggle="tooltip"
																data-placement="top"
																title=""
																data-original-title="Edit"
																onClick={() => {
																	selSelectedSlotAllocation(item);
																	setDialogTypeAdd(false);
																	handleShowEditDialog();
																}}>
																<span className="btn-inner">
																	<svg
																		width="20"
																		viewBox="0 0 24 24"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg">
																		<path
																			d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
																			stroke="currentColor"
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"></path>
																		<path
																			fillRule="evenodd"
																			clipRule="evenodd"
																			d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
																			stroke="currentColor"
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"></path>
																		<path
																			d="M15.1655 4.60254L19.7315 9.16854"
																			stroke="currentColor"
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"></path>
																	</svg>
																</span>
															</Button>{" "}
															<Button
																className="btn btn-sm btn-icon btn-danger"
																data-toggle="tooltip"
																data-placement="top"
																title=""
																data-original-title="Delete"
																onClick={() => {
																	selSelectedSlotAllocation(item);
																	handleShowDeleteDialog();
																}}>
																<span className="btn-inner">
																	<svg
																		width="20"
																		viewBox="0 0 24 24"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																		stroke="currentColor">
																		<path
																			d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
																			stroke="currentColor"
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"></path>
																		<path
																			d="M20.708 6.23975H3.75"
																			stroke="currentColor"
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"></path>
																		<path
																			d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
																			stroke="currentColor"
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"></path>
																	</svg>
																</span>
															</Button>{" "}
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</LoadingOverlay>

			<Modal show={showDeleteDialog} onHide={handleCloseDeleteDialog}>
				<Modal.Header closeButton>
					<Modal.Title>Are you Sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You are about to delete {selectedSlotAllocation.courseCode} for {selectedSlotAllocation.batchName}.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDeleteDialog}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSlotAllocationDelete}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{showEditDialog ? (
				<EditSlotAllocation
					slotAllocation={selectedSlotAllocation}
                    timetable = {timetable}
					addSlotAllocation={dialogTypeAdd}
					closeDialog={handleCloseEditDialog}
				/>
			) : (
				""
			)}
			{fileChooserDialog? (
				<FileChooseDialog
					closeDialog={()=>{setFileChooserDialog(false)}}
					uploadData={hanldeCsvDataUpload}
				/>
			) : ("")}

        </div>
    );
}

export default SlotAllocation;