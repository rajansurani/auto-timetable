import Faculty from '../Dashboard/Faculty/Faculty';
import Courses from '../Dashboard/Course/Courses';
import Classrooms from '../Dashboard/Classroom/Classrooms';
import Timetable from '../Dashboard/Timetable/Timetable';
import Home from '../Dashboard/Home';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';
import Batches from '../Dashboard/Batch/Batches';
import CourseAllocation from '../Dashboard/Timetable/CourseAllocation/CourseAllocation';
import SlotAllocation from '../Dashboard/Timetable/SlotAllocation/SlotAllocation';

const DefaultRouter = () => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    <Route path="/home" exact  component={Home} />
                    <Route path="/faculty" exact component={Faculty} />
                    <Route path="/courses"  exact component={Courses}/>
                    <Route path="/classrooms" exact component={Classrooms}/>
                    <Route path="/timetable" exact component={Timetable}/>
                    <Route path="/batch" exact component={Batches}/>
                    <Route path="/courseAllocation/:version" exact component={CourseAllocation}/>
                    <Route path="/slotAllocation/:version" exact component={SlotAllocation}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default DefaultRouter
