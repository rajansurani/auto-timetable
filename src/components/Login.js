import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword, auth } from "../database/dataAccess";
import { useAuthState } from "react-firebase-hooks/auth";

import { Row, Col, Image, Form, Button } from "react-bootstrap";
import auth1 from "../assets/images/auth/01.png";
import Card from "./UiKitComponents/Card";
import LoadingOverlay from "react-loading-overlay";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const history = useHistory();
	const [showAuthenticationOverlay, setShowAutheticationOverlay] = useState(false);
	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen

			return;
		}
		if (user) history.replace("/home");
	}, [user, loading]);
	return (
		<LoadingOverlay
			active={showAuthenticationOverlay}
			spinner
			text="Authenticating...">
			<div class="wrapper">
				<section className="login-content">
					<Row className="m-0 align-items-center bg-white vh-100">
						<Col md="6">
							<Row className="justify-content-center">
								<Col md="10">
									<Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
										<Card.Body>
											<h2 className="mb-2 text-center">Sign In</h2>
											<p className="text-center">Login to stay connected.</p>
											<Form>
												<Row>
													<Col lg="12">
														<Form.Group className="form-group">
															<Form.Label htmlFor="email" className="">
																Email
															</Form.Label>
															<Form.Control
																type="email"
																className=""
																id="email"
																aria-describedby="email"
																placeholder=" "
																value={email}
																onChange={(e) => setEmail(e.target.value)}
															/>
														</Form.Group>
													</Col>
													<Col lg="12" className="">
														<Form.Group className="form-group">
															<Form.Label htmlFor="password" className="">
																Password
															</Form.Label>
															<Form.Control
																type="password"
																className=""
																id="password"
																aria-describedby="password"
																placeholder=" "
																value={password}
																onChange={(e) => setPassword(e.target.value)}
															/>
														</Form.Group>
													</Col>
													<Col
														lg="12"
														className="d-flex justify-content-between">
														<Form.Check className="form-check mb-3">
															<Form.Check.Input
																type="checkbox"
																id="customCheck1"
															/>
															<Form.Check.Label htmlFor="customCheck1">
																Remember Me
															</Form.Check.Label>
														</Form.Check>
														<Link to="/auth/recoverpw">Forgot Password?</Link>
													</Col>
												</Row>
												<div className="d-flex justify-content-center">
													<Button
														onClick={(e) => {
															e.preventDefault();
															setShowAutheticationOverlay(true);
															signInWithEmailAndPassword(email, password).then(()=>{
                                                setShowAutheticationOverlay(false)}
                                             );
														}}
														type="button"
														variant="btn btn-primary">
														Sign In
													</Button>
												</div>
											</Form>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Col>
						<Col
							md="6"
							className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
							<Image
								src={auth1}
								className="Image-fluid gradient-main animated-scaleX"
								alt="images"
							/>
						</Col>
					</Row>
				</section>
			</div>
		</LoadingOverlay>
	);
}
export default Login;
