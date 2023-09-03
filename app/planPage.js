
import { useContext } from 'react';
import VertretungsplanComponent from './VertretungsplanComponent';
import { VertretungsplanContext } from "./vertretungsplanContext";
import { UserContext } from "./userContext";


export default function planPage() {


    const { vertretungsplanData, setVertretungsplanData } = useContext(VertretungsplanContext)
    const { userData, setUserData } = useContext(UserContext)
    console.log(userData.jahrgang)
    return (
        <VertretungsplanComponent vertretungsplanData={vertretungsplanData} containNews={false} dataFilter={userData.jahrgang} />
    );





}