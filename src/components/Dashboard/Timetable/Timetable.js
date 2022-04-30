import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../../UiKitComponents/Card";
import LoadingOverlay from "react-loading-overlay";
import { Modal } from "react-bootstrap";
import {
	deleteTimetableByVersion,
	fetchTimetables,
} from "../../../database/dataAccess";
import EditTimetable from "./EditTimetable";
import { Link } from "react-router-dom";
function Timetable() {
	const [timetableList, setTimetableList] = useState([]);
	const [showLoadingOverlay, setLoadingOverlay] = useState(false);
	const [selectedTimetable, setSelectedTimetable] = useState({});

	useEffect(() => {
		updateTimetableList();
	}, []);

	const updateTimetableList = () => {
		setLoadingOverlay(true);
		fetchTimetables().then((timetables) => {
			setTimetableList(timetables);
			setLoadingOverlay(false);
		});
	};

	const handleTiemtableDelete = () => {
		deleteTimetableByVersion(selectedTimetable.timetableVersionName).then(
			() => {
				updateTimetableList();
				handleCloseDeleteDialog();
			}
		);
	};

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const [showEditDialog, setShowEditDialog] = useState(false);

	const handleCloseEditDialog = () => {
		setShowEditDialog(false);
		updateTimetableList();
	};
	const handleShowEditDialog = () => setShowEditDialog(true);

	const [dialogTypeAdd, setDialogTypeAdd] = useState(false);

	return (
		<div>
			<LoadingOverlay
				active={showLoadingOverlay}
				spinner
				text="Loading Timetables...">
				<Row>
					<Col sm="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<div className="header-title">
									<h4 className="card-title">Timetables</h4>
								</div>
								<div className="d-grid gap-2 d-md-flex justify-content-md-end">
									<Button
										variant="primary"
										className="p-2"
										onClick={() => {
											setDialogTypeAdd(true);
											setSelectedTimetable({
												timetableVersionName: "",
												batches: [],
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
										Create New Timetable
									</Button>{" "}
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
												<th>Timetable Version</th>
												<th>Batches</th>
												<th>Course Allocation</th>
												<th>Slot Allocation</th>
												<th min-width="100px">Action</th>
											</tr>
										</thead>
										<tbody>
											{timetableList.map((item, idx) => (
												<tr key={idx}>
													<td>{item.timetableVersionName}</td>
													<td>
														{item.batches.map((batch, index) => (
															<span className="badge bg-secondary p-2 m-1">
																{batch}
															</span>
														))}
													</td>
													<td>
                                                        <Link to = {'courseAllocation/'+item.timetableVersionName}>
														<Button variant="outline-primary">Start</Button>
                                                        </Link>
													</td>
													<td>
													<Link to = {'slotAllocation/'+item.timetableVersionName}>
														<Button variant="outline-primary">Start</Button>
														</Link>
													</td>
													<td>
														<div className="flex align-items-center list-user-action">
															<Button
																className="btn btn-sm btn-icon btn-success"
																data-toggle="tooltip"
																data-placement="top"
																title=""
																data-original-title="View"
																onClick={() => {}}>
																<span className="btn-inner">
																	<svg
																		width="32"
																		viewBox="0 0 24 24"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg">
																		{" "}
																		<path
																			fill-rule="evenodd"
																			clip-rule="evenodd"
																			d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
																			stroke="currentColor"
																			stroke-width="1.5"
																			stroke-linecap="round"
																			stroke-linejoin="round"></path>{" "}
																		<path
																			fill-rule="evenodd"
																			clip-rule="evenodd"
																			d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
																			stroke="currentColor"
																			stroke-width="1.5"
																			stroke-linecap="round"
																			stroke-linejoin="round"></path>{" "}
																	</svg>
																</span>
															</Button>{" "}
															<Button
																className="btn btn-sm btn-icon btn-warning"
																data-toggle="tooltip"
																data-placement="top"
																title=""
																data-original-title="Edit"
																onClick={() => {
																	setSelectedTimetable(item);
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
																	setSelectedTimetable(item);
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
					You are about to delete {selectedTimetable.timetableVersionName}.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDeleteDialog}>
						Close
					</Button>
					<Button variant="primary" onClick={handleTiemtableDelete}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{showEditDialog ? (
				<EditTimetable
					timetable={selectedTimetable}
					addTimetable={dialogTypeAdd}
					closeDialog={handleCloseEditDialog}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Timetable;
