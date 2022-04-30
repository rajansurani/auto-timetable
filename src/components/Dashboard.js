import DefaultRouter from "./Router/DashboardRouter";
import Sidebar from "./SideBar/Sidebar";

function Dashboard(){

    return(
        <div>
					<Sidebar />
				<main className="main-content">
				<div className="conatiner-fluid content-inner ">
					<DefaultRouter />
				</div>
			</main>
			
		</div>
    );
}

export default Dashboard;