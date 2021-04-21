import React from 'react';
import Row from './Rows';

class Verticaltable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataA: null,
            dataB: null,
            columns: null
        };
    }
    componentDidMount() {
        this.setState({
            dataA: this.props.dataA,
            dataB: this.props.dataB,
            columns: this.props.columns
        })
    }

    render()
    { const { dataA, dataB } = this.props;
    const { columns } = this.props
        return(
            <div className="table">
                {this.props&&
                        <table className="the-table">
                            <tbody>
                            {columns.map((el) => {
                                return <Row accommodationA={ dataA }
                                            accommodationB={ dataB }
                                            selector={el.selector}
                                            sourceUrl={el.sourceUrl}
                                            title={el.title}
                                            imgA={el.imgA}
                                            imgB={el.imgB}
                                           />
                            })}
                            </tbody>
                        </table>
                }
            </div>
        );
    }
}

export default Verticaltable;