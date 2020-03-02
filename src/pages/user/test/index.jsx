import React from 'react';
import { connect } from 'dva';

function Test() {
  return (
    <div>test</div>
  )
}

export default connect()(Test)
