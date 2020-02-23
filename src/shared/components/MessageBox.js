import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/request-hook';

const MessageBox = (props) => {
  const [messages, setMessages] = useState();
  const {isLoading, sendRequest} = useFetch();

  useEffect (()=> {

  }, []);

  return <div className="messagebox"></div>
}

export default MessageBox;