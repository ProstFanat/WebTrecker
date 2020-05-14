let request = require('request-promise')
let assert = require('chai').assert

let auth = {
    optionsLogin: {
        method: 'POST',
        url: 'https://devtracker.itdevsrv.pro/api/auth/login',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        json: true,
    },

    optionsRegister: {
        method: "POST",
        url: "https://devtracker.itdevsrv.pro/api/auth/register", 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        json: true,
    },

    counter: 0,
}

describe('Test Auth', () => {
  describe('Test Login', () => {

    it('Positive test', async function(){
      let options = auth.optionsLogin
      options.body = {
        "email": "dev@mail.com",
        "password": "1",
      }

      await request(options)
        .then(function (response) {
          //console.log(response.data.token);
          assert.equal(response.status, true);
        })

        .catch(function (err) {
          console.error(err);
        })
    });

    it('Test with wrong Password', async function() {
      let options = auth.optionsLogin
      options.body = {
        "email": "dev@mail.com",
        "password": "2",
      }

      await request(options)
        .then(function (response) {
        //console.log(response);
      })

      .catch(function (err) {
        //console.log(err["message"].message);
        assert.equal(err.message, '401 - {"status":false,"message":"Login or password incorrect","data":null}');
      })
    });

    it('Test with wrong email', async function() {
      let options = auth.optionsLogin
      options.body = {
          "email": "dev1000h@mail.com",
          "password": "1",
      }

      await request(options)
        .then(function (response) {
          //console.log(response);
        })

        .catch(function (err) {
          //console.log(err["message"]);
          assert.equal(err.message, '401 - {"status":false,"message":"Login or password incorrect","data":null}')
        })
    });

    it('Test with empty email', async function() {
      let options = auth.optionsLogin
      options.body = {
        "email": '',
        "password": "1",
      }

      await request(options)
        .then(function (response) {
          //console.log(response);
          assert.equal(response.message, 'email is not allowed to be empty');
        })

        .catch(function (err) {
          //console.log(err["message"]);
        })
    });

    it('Test with empty pass',async function() {
      let options = auth.optionsLogin
      options.body = {
          "email": "dev@mail.com",
          "password": "",
      }

      await request(options)
          .then(function (response) {
              //console.log(response);
              assert.equal(response.message, 'password is not allowed to be empty');
          })

          .catch(function (err) {
              console.log(err["message"]);
          })
    });

    it('Test with empty mail and pass',async function() {
      let options = auth.optionsLogin
      options.body = {
        "email": "",
        "password": "",
      }

      await request(options)
        .then(function (response) {
          //console.log(response);
          assert.equal(response.status, false);
        })

        .catch(function (err) {
          console.log(err["message"]);
        })
    });

  });

  describe('Test Register', () => {
    
    it('Positive test',async function() {
      let options = auth.optionsRegister
      options.body = {
          "firstname": "Teest",
          "lastname": "Test",
          "email": `test22${Math.random()}@mail.com`,
          "password": "1",
          "role": "2"
      },
      await request(options)
          .then(function(response) {
              //console.log(response);
              assert.equal(response.message, "success")
          })

          .catch(function(err){
              console.error(err);
          }) 
    });

    it('Test with empty first name',async function() {
      let options = auth.optionsRegister
      options.body = {
        "firstname": "",
        "lastname": "Test",
        "email": `test22${Math.random()}@mail.com`,
        "password": "1",
        "role": "2"
      },
      await request(options)
        .then(function(response) {
          //console.log(response);
          assert.equal(response.message,'firstname is not allowed to be empty')
        })

        .catch(function(err){
          console.error(err);
        }) 
    });

    it('Test with empty last name',async function() {
      let options = auth.optionsRegister
        options.body = {
          "firstname": "Test",
          "lastname": "",
          "email": `test22${Math.random()}@mail.com`,
          "password": "1",
          "role": "2"
        },
        await request(options)
          .then(function(response) {
            //console.log(response);
            assert.equal(response.message,'lastname is not allowed to be empty')
          })

          .catch(function(err){
            console.error(err);
          }) 
    });

    it('Test with empty email', async function() {
      let options = auth.optionsRegister
      options.body = {
        "firstname": "Test",
        "lastname": "Test",
        "email": ``,
        "password": "1",
        "role": "2"
      },
      await request(options)
        .then(function(response) {
          //console.log(response);
          assert.equal(response.message,'email is not allowed to be empty')
        })

        .catch(function(err){
          console.error(err);
        }) 
    });

    it('Test with empty pass', async function() {
      let options = auth.optionsRegister
      options.body = {
        "firstname": "Test",
        "lastname": "Test",
        "email": `test22${Math.random()}@mail.com`,
        "password": "",
        "role": "2"
      },
      await request(options)
        .then(function(response) {
          //console.log(response);
          assert.equal(response.message,'password is not allowed to be empty')
        })

        .catch(function(err){
          console.error(err);
        })  
    });

    it('Test with not avaliable mail', async function() {
      let options = auth.optionsRegister
      options.body = {
          "firstname": "Test",
          "lastname": "Test",
          "email": `test@mail.com`,
          "password": "1",
          "role": "2"
      },
      await request(options)
          .then(function(response) {
              //console.log(response);
              assert.equal(response.message,'Email is not available')
          })

          .catch(function(err){
              console.error(err);
          }) 
    });

    it('Test with invalid mail', async function() {
      let options = auth.optionsRegister
      options.body = {
          "firstname": "Test",
          "lastname": "Test",
          "email": `test@mail`,
          "password": "1",
          "role": "2"
      },
      await request(options)
          .then(function(response) {
              //console.log(response);
              assert.equal(response.message,'email must be a valid email')
          })

          .catch(function(err){
              console.error(err);
          })  
    });

    it('Test with empty form', async function() {
      let options = auth.optionsRegister
      options.body = {
          "firstname": "",
          "lastname": "",
          "email": ``,
          "password": "",
          "role": ""
      },
      await request(options)
          .then(function(response) {
              //console.log(response);
              assert.equal(response.status,false)
          })

          .catch(function(err){
              console.error(err);
          }) 
    });

  });
});

let freelance = {
  options: {
      headers: {
          "Content-type": "application/json",
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZXZAbWFpbC5jb20iLCJyb2xlX2lkIjoxLCJpYXQiOjE1ODg3NTMwNjB9.VlGJ0ypDknU2f0HO9Jbd_m3Q0uEOMh0doAWvwXr1E3M",
      },    
      json: true,
  }
};

describe('Freelance tests', () => {
  
  describe('Get members tests', () => {

    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/1/members`;
   
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, 'success');
      })
        .catch(function(err){
          console.error(err);
      })
    });

    it('Project id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member//members`;
      
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be a number');
      })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })
    });

    it('Project id is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/test/members`;
   
      await request(options)
        .then(function(response){
          //console.log(response) 
      })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      }) 
    });

    it('Project id is < 0', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/-1/members`;
   
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be larger than or equal to 0');
      }) 
    });

  })

  describe('Approve project test', () => {

    //it('Positive test', async function() {
    //  let options = freelance.options;
    //  options.method = 'PATCH';
    //  options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/1/approve`;
    //    
    //  await request(options)
    //    .then(function(response){
    //      //console.log(response)
    //      //console.log(response.data)
    //      assert.equal(response.message, 'success');
    //  })
    //   .catch(function(err){
    //      console.error(err);
    //  })
    //});

    it('Project id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member//approve`;
      
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be a number');
      })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })
    });

    it('Project id is string', async function() {
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/test/approve`;
      
      await request(options)
        .then(function(response){
          //console.log(response) 
      })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      }) 
    });

    it('Project id is < 0', async function() {
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/-1/approve`;
   
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be larger than or equal to 0');
      }) 
    });

  })

  describe('Archive project test', () => {

    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/1/archive`;
      options.body = {
              is_archive: 1,
          };
           
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.status, false);
      })
        .catch(function(err){

        })

    });

    it('Project id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member//archive`;
      options.body = {
              is_archive: 1,
          };

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be a number');
      })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })
    });

    it('Project id is string', async function() {
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/test/archive`;
      options.body = {
              is_archive: 1,
          };

      await request(options)
        .then(function(response){
          //console.log(response) 
      })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      }) 
    });

    it('Project id is < 0', async function() {
      let options = freelance.options;
      options.method = 'PATCH';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/-1/archive`;
      options.body = {
              is_archive: 1,
        };

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be larger than or equal to 0');
      }) 
    });
  });

  describe('Get projects', () => {
    it('Get projects', async function() {
      let options = freelance.options;
        options.method = 'GET';
        options.url = 'https://devtracker.itdevsrv.pro/api/freelance/project';
        options.body = {
                is_approve: 1,
                is_archive: 0,
            };           


        await request(options)
            .then(function(response){
                //console.log(response);
                assert.equal(response.message, 'success');
            });
    });
  });

  describe('Get Project By Id',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project/by/1`;
      options.body = {
              is_approve: 1,
              is_archive: 0,
          }; 
          
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, 'success');
      })

    });

    it('Project id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project/by/`;
      options.body = {
              is_approve: 1,
              is_archive: 0,
          }; 
       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
      })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })
    });

    it('Project id is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project/by/test`;
      options.body = {
              is_approve: 1,
              is_archive: 0,
          }; 

      await request(options)
        .then(function(response){
          //console.log(response) 
      })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      }) 
    });

    it('Project id is < 0', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/project/by/-1`;
      options.body = {
              is_approve: 1,
              is_archive: 0,
          }; 
       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be larger than or equal to 0');
      }) 
    });
  });

  describe('Get Reports',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=2020-03-01&date_end=2020-05-05`;

          
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, 'success');
      })

    });

    it('Date begin is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=&date_end=2019-05-07`;


      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      })
    });

    it('Date end is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=2020-04-01&date_end=`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
      }) 
    });

    it('Date begin and Date end are undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=&date_end=`;


      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      })
    });

    it('Date begin is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=test&date_end=2020-05-07`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      })  
    });

    it('Date end is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=2020-04-01&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
      })  
    });

    it('Date begin and Date end are string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=test&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      }) 
    });

    it('Date begin > Date end', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=2020-04-01&date_end=2019-05-07`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.status, false) 
      })
         
    })
  });

  
  describe('Get Report PDF',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=2020-03-01&date_end=2020-05-05`;

          
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, 'success');
      })

    });

    it('Date begin is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=&date_end=2019-05-07`;


      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      })
    });

    it('Date end is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=2020-04-01&date_end=`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
      }) 
    });

    it('Date begin and Date end are undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=&date_end=`;


      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      })
    });

    it('Date begin is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=test&date_end=2020-05-07`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      })  
    });

    it('Date end is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=2020-04-01&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
      })  
    });

    it('Date begin and Date end are string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=test&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      }) 
    });

    it('Date begin > Date end', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=2020-04-01&date_end=2019-05-07`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.status, false) 
        }) 
        
    });
  });

  describe('Get Activities',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=2020-03-01&date_end=2020-05-05`;

          
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, 'success');
      })

    });

    it('Date begin is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=&date_end=2019-05-07`;


      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      })
    });

    it('Date end is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=2020-04-01&date_end=`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
      }) 
    });

    it('Date begin and Date end are undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=&date_end=`;


      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      })
    });

    it('Date begin is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=test&date_end=2020-05-07`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      })  
    });

    it('Date end is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=2020-04-01&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
      })  
    });

    it('Date begin and Date end are string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=test&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      }) 
    });

    it('Date begin > Date end', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=2020-04-01&date_end=2019-05-07`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.status, false) 
        }) 
        
    });
  });

  describe('Get Activities By Id',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=2020-01-01&date_end=2020-02-02`;

          
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, 'success');
      })

    });

    it('All are undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      let id;
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/${id}?date_begin=&date_end=`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
      }) 
    });

    it('Id is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      let id;
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/${id}?date_begin=2001-02-02&date_end=2020-01-01`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
        }) 
    });

    it('Id is < 0', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/-1?date_begin=2001-02-02&date_end=2020-01-01`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be larger than or equal to 0');
      }) 
    });

    it('id is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/test?date_begin=2001-02-02&date_end=2020-01-01`;

      await request(options)
        .then(function(response){
          //console.log(response) 
      })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      }) 
    });

    it('Date begin and Date End are undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=&date_end=`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      }) 
    });

    it('Date begin is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=&date_end=2020-01-01`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
      }) 
    });

    it('Date end is undefined', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=2020-01-01&date_end=`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
      }) 
    });

    it('Date begin is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=test&date_end=2020-01-01`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      }) 
    });

    it('Date end is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=2020-01-01&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
      }) 
    });

    it('Date befin and date end are strings', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=test&date_end=test`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
      })
    });

    it('Date begin > Date end', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/1?date_begin=2020-02-02&date_end=2020-01-01`;

      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.status, false);
        })  
    });

  })

  describe('Get Activities By Task Id',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/bytask/1`;
          
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, "success");
        })

    });

    it('Task id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/bytask/`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
        })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })  
    });

    it('Task id is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/bytask/test`;


      await request(options)
        .then(function(response){
          //console.log(response) 
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        }) 
    });

    it('Task id is < 0', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/bytask/-1`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be larger than or equal to 0');
        })
      
    });
  });

  describe('Del Activity By Task Id',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/1`;
 
      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          //assert.equal(response.message, "success");
        })
    });

    it('Task id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
        })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })   
    });

    it('Task id is string', async function() {
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/test`;


      await request(options)
        .then(function(response){
          //console.log(response) 
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        }) 
    });

    it('Task id is < 0', async function() {
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/-1`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be larger than or equal to 0');
        }) 
      
    });
  });

  describe('Get Tasks',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task?project_id=5`;

      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, "success");
        })
    });

    it('Task id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task?project_id=`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be a number');
        })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        })   
    });

    it('Task id is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task?project_id=test`;


      await request(options)
        .then(function(response){
          //console.log(response) 
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        })
    });

    it('Task id is < 0', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task?project_id=-1`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be larger than or equal to 0');
        }) 
      
    });
  });

  describe('Create Task',() => {
    it('Positive test', async function() {
      let options = freelance.options
      options.method = 'POST';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task`;
      options.body = {
              "project_id": 25,
              "name": "testAPI"
          };  

      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, "success");
        })
    });

    it('Task id is undefined', async function() {    
        let options = freelance.options
        options.method = 'POST';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task`;
        options.body = {
                "project_id": '',
                "name": "testAPI"
            };  
       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be a number');
        }) 
    });

    it('Task id is string', async function() {
      let options = freelance.options
      options.method = 'POST';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task`;
      options.body = {
              "project_id": 'test',
              "name": "testAPI"
          };  

      await request(options)
        .then(function(response){
          //console.log(response) 
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        })
    });

    it('Task id is < 0', async function() {
      let options = freelance.options
      options.method = 'POST';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task`;
      options.body = {
              "project_id": -1,
              "name": "testAPI"
          };  
       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'project_id must be larger than or equal to 0');
        })
      
    });
  });

  describe('Get task by Id',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/10011`;

      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          assert.equal(response.message, "success");
        })
        .catch(function(err){

        }) 
        
    });

    it('Task id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        }) 
    });

    it('Task id is string', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/test`;


      await request(options)
        .then(function(response){
          //console.log(response) 
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        }) 
    });

    it('Task id is < 0', async function() {
      let options = freelance.options;
      options.method = 'GET';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/-1`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be larger than or equal to 0');
        })
      
    });
  });

  describe('Delete task by id',() => {
    it('Positive test', async function() {
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/10011`;

      await request(options)
        .then(function(response){
          //console.log(response)
          //console.log(response.data)
          //assert.equal(response.message, "success");
        })
    });

    it('Task id is undefined', async function() {    
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be a number');
        })
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
      })   
    });

    it('Task id is string', async function() {
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/test`;


      await request(options)
        .then(function(response){
          //console.log(response) 
        })  
        .catch(function(err){
          assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
        }) 
    });

    it('Task id is < 0', async function() {
      let options = freelance.options;
      options.method = 'DELETE';
      options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/-1`;

       
      await request(options)
        .then(function(response){
          //console.log(response)
          assert.equal(response.message, 'id must be larger than or equal to 0');
        }) 
      
    });
  });
  
})