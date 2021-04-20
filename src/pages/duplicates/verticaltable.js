import React from 'react';
import { Stars } from 'matsumoto/src/simple/components/stars';
import Row from './Rows';

class Verticaltable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataA: null,
            dataB: null,
        };
    }
    componentDidMount() {
        this.setState({
            dataA: this.props.dataA,
            dataB: this.props.dataB
        })
        // this.setState(this.props.dataA);
        // this.setState(this.props.dataB)
    }

    render()

    { const { dataA } = this.props;
      const { dataB } = this.props;
      const array = [
          'photos[0].sourceUrl',
          'rating',
          'name',
          'id',
          'contacts.emails',
          'contacts.phones',
          'location.country',
          'location.address',
          'location.coordinates'
      ];
        return(
            <div className="table">
                {this.props&&
                        <table className="the-table">
                            <tbody>
                            {array.map((selector) => {
                                return <Row accommodationA={ dataA }
                                             accommodationB={ dataB }
                                             selector={selector}
                                             title={selector.replace('.' , ' ')}/>
                            })}

                            {/*<Row accommodationA={dataA}*/}
                            {/*     accommodationB={dataB}*/}
                            {/*     selector={'name'}*/}
                            {/*title={'Name'}/>*/}
                            {/*    <tr>*/}
                            {/*        <td></td>*/}
                            {/*        <td>*/}
                            {/*            <img width="300" src={dataA.photos[0].sourceUrl}/>*/}
                            {/*        </td>*/}
                            {/*        <td>*/}
                            {/*            <img width="300" src={dataB.photos[0].sourceUrl}/>*/}
                            {/*        </td>*/}
                            {/*    </tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Rating</td>*/}
                                {/*    <td><Stars count={dataA.rating}/></td>*/}
                                {/*    <td><Stars count={dataB.rating}/></td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>ID</td>*/}
                                {/*    <td>{dataA.id}</td>*/}
                                {/*    <td>{dataB.id}</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Name</td>*/}
                                {/*    <td>{dataA.name}</td>*/}
                                {/*    <td>{dataB.name}</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Email</td>*/}
                                {/*    <td>{dataA.contacts.emails}</td>*/}
                                {/*    <td>{dataB.contacts.emails}</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Phones</td>*/}
                                {/*    <td>{dataA.contacts.phones}</td>*/}
                                {/*    <td>{dataB.contacts.phones}</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Country</td>*/}
                                {/*    <td>{dataA.location.country}</td>*/}
                                {/*    <td>{dataB.location.country}</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Address</td>*/}
                                {/*    <td>{dataA.location.address}</td>*/}
                                {/*    <td>{dataB.location.address}</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Coordinates</td>*/}
                                {/*    <td>{dataA.location.coordinates.latitude}<br/>{dataA.location.coordinates.longitude}</td>*/}
                                {/*    <td>{dataB.location.coordinates.latitude}<br/>{dataB.location.coordinates.longitude}</td>*/}
                                {/*</tr>*/}
                            </tbody>
                        </table>
                }
            </div>
        );
    }
}

export default Verticaltable;