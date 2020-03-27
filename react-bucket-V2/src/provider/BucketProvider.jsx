import React, { createContext } from "react";

/*
    observer로서 state변수와 여러가지 handler method를 통합관리하고
    상위(Main) component에서 하위(View,List,Insert) component에 
    state 변수를 전달하고
    하위 component에서 Main의 state변수를 변경하여
    여러 component에 state변수를 전파할 때 사용할 handler method를
    배포하는 역할을 수행
*/
const BucketProvider = createContext({
  // 여러 component에 전파할 대 사용할 state변수
  bucketList: [],

  // 하위 component에서 전달받아 사용할 handler method
  changFlag: id => {},
  bucket_add: b_title => {},
  bucket_update: (id, b_title) => {},
  bucket_complete: (id, b_end_date) => {},
  toggleCancel: id => {}
});

export default BucketProvider;
