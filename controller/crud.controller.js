const crudModel = require("../models/crud.model");

class crudController {
  // add form show
  async addForm(req, res) {
    try {
      res.render("add", {
        title: "addForm",
      });
    } catch (err) {
      throw err;
    }
  }

  async insertForm(req, res) {
    try {
      // insert form
      req.body.image = [];
      for (let i = 0; i < req.files.length; i++) {
        req.body.image.push(req.files[i].filename);
      }

      let save_data = await crudModel.create(req.body);
      console.log(save_data);
    } catch (err) {
      throw err;
    }
  }

  async homePage(req, res) {
    try {
      const allData = await crudModel
        .find({ isDeleted: false })
        .sort({ createdAt: -1 });

      res.render("list", {
        title: "list",
        allData,
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(req, res) {
    try {
      let deleteObj = {
        isDeleted: true,
      };

      let deletedData = await crudModel.findByIdAndUpdate(
        req.params.id,
        deleteObj
      );
      if (deletedData) {
        console.log("data Deleted ");
        res.redirect("/");
      }
    } catch (err) {
      throw err;
    }
  }

//   show edit form 
async editForm(req,res){
    try{
        let data = await crudModel.findOne({_id:req.params.id})

        res.render('edit',({
            title:"edit form",
            data
        }))

    }catch(err){
        throw err
    }
}

//  update data

async update(req,res){
    try{
        let updatedObj = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            address: req.body.address,
            hobby: req.body.hobby,
            citizen: req.body.citizen, 

        }

        let ExistingImg = await crudModel.findOne({_id: req.body.id})

        // if the new image added
        if (!_.isEmpty(req.files)) {
            req.body.image = []

               // if Image Exists
               if(ExistingImg.image.length>=1){ 
                        
                // push existing images in body.image array 
                for (let j = 0; j < ExistingImg.image.length; j++ ){   
                req.body.image.push(ExistingImg.image[j]);
                    //console.log(req.body.image ,"exists"); 
            }   }

             // use loop to push new image(s) in array one by one 
             for (let i = 0; i < req.files.length; i++ ){                
                req.body.image.push(req.files[i].filename); 
                    //console.log(req.body.image ,"total");                                   
            }

            updatedObj.image =  req.body.image; 
        }

            let updated_data = await crudModel.findByIdAndUpdate(req.body.id, updatedObj)

            if(!_.isEmpty(updated_data)){
                console.log("data updated");
                res.redirect('/')

            }

    }catch(err){
        throw err
    }
}

async imageView(req,res){
    try{
        let img_details = await crudModel.findOne({_id: req.params.id})
        let pageNo = req.params.pid

        res.render('imgview',{
            title:"imageview",
            img_details,
            pageNo
        })

    }catch(err){

    }
}

async imageDelete (){
    try{
        

    }catch(err){
        throw err
    }
}




}

module.exports = new crudController();
