import organizationModel from "../models/organization.model.js"
export const CreateOrganization = async(req,res,next)=>{
    try {
        const organizationData = req.body;
        const createOrganization = new organizationModel(organizationData);
        await createOrganization.save();
        console.log(createOrganization);

        res.status(200).json({
            status:"success",
            data:createOrganization
        })
    } catch (error) {
        console.log(error);
        
    }

}
export const getOrganization = async(req,res,next)=>{
    try {
        if(!req.body.id){
            return new Error("id missing")
        }
        const getOrganization = await organizationModel.findById(req.body.id)
        res.status(200).json({
            status:"success",
            data:getOrganization
        })
    } catch (error) {
        console.log(error)
    }
}
export const UpdateOrganization = async(req,res,next)=>{
    try {
        const organizationData = req.body;
        const updateOrganization = await organizationModel.findByIdAndUpdate(organizationData.id,{
            username:organizationData.username
        })

        res.status(200).json({
            status:"success",
            data:updateOrganization
        })
    } catch (error) {
        console.log(error);
        
    }

}
export const DeleteOrganization = async(req,res,next)=>{
    try {
        const organizationData = req.body;
        const findOrganization = await organizationModel.findOne({
            clerkId:organizationData.id
        })
        if(!findOrganization){
            return res.status(500).json({
                status:"error",
                data:"error finding organization"
            })
        }
        const deleteOrganization = await organizationModel.findByIdAndDelete(findOrganization.id);

        res.status(200).json({
            status:"success",
            data:deleteOrganization
        })
    } catch (error) {
        console.log(error);
        
    }

}