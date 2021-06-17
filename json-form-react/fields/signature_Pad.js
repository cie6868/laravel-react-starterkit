import {Component} from 'react'
import SignaturePad from "signature_pad"


class signature_Pad extends Component {
  constructor(props) {
    super(props)
    this.canvas = {}
    this.signaturePad = {}
    this.savedSignature = {}
  }

  componentDidMount() {
    this.signaturePad = new SignaturePad(this.canvas, {
      minWidth: 0.5,
      maxWidth: 2.5,
      penColor: "rgb(66, 133, 244)"
    });
  }

  render() {
    return (
      <div className="App">
        <canvas style={{border: "1px solid #000"}} ref={(element) =>{this.canvas = element}}></canvas>
        
        <div>
          <button onClick={()=>{
            this.savedSignature = this.signaturePad.toData();
            console.log(this.signaturePad.toData());
          }}>Submit</button>
          <button onClick={()=> {
            this.signaturePad.fromData(this.savedSignature)
          }}>Reload</button>
          <button onClick={()=> {
            this.signaturePad.clear()
          }}>Clear</button>
        </div>
        
      </div>
    )
  }
}
export default signature_Pad;