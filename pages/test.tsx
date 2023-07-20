import { SetStateAction, useEffect, useState } from "react";
import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives';

import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { ChainId, ThirdwebProvider , useContract , ConnectWallet, useAddress, useSDK} from "@thirdweb-dev/react";
const activeChain = "mumbai"; 
const IndexPage: NextPage = () => {

   
       const [name, setName] = useState("");
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [percent, setPercent] = useState(0);
    /////////////////////////////////////start////////////
    // const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();

    // Function to deploy the proxy contract
 


    // platform_fee_recipient: recipient,
    //     platform_fee_basis_points: num,


const handleSubmit = async (event: { preventDefault: () => void; }) => {
  
    if (!address || !sdk) {
        alert(`address: ${address}`);
      return;
    }


    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(name);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    let num = Number(percent);
     const contractAddress = await sdk.deployer.deployBuiltInContract(
      myCar,
      {
        name: name,
        symbol: symbol,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: recipient,

        recipients: [
          {
            address:address,
            sharesBps: 100
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(contractAddress);
      alert(contractAddress);
    // alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);
    
    // alert(`The name you entered was: ${name}`);
  }


  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMyCar(event.target.value)
  }




  return (
    
         
    <Layout>
      <Flex
        direction="column"
        align="center"
        css={{ py: '200px', px: '$3', textAlign: 'center' }}
      >
        {/* <Box css={{ color: '$gray11', mb: '30px' }}>
          <FontAwesomeIcon icon={faFolderOpen} size="2xl" />
        </Box> */}
        {/* <ConnectWallet/> */}
        {/* <Text style="body1" color="subtle" css={{ mb: '$1' }}>
          test 404 Error.
        </Text> */}
      
        {/* ////////////////////////// */}

          <form onSubmit={handleSubmit}>
            
<label>Contract Type:&nbsp;
            
            
                <select  onChange={handleChange} className="form-control">
        <option value="nft-collection">721 </option>
        <option value="edition">1155</option>
      </select> 
   </label> 

      <br></br>
      <br></br>
   
      <label>Enter  name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>

       <label>Enter  Symbol:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <label>Enter  Discription:&nbsp;&nbsp;&nbsp;
        <textarea 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
    
      <br></br>
      <br></br>
      <br></br>
  


      <Button type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Deploy Now
              </Button>
              
    </form>

      </Flex>
    </Layout>

  )
}

export default IndexPage
