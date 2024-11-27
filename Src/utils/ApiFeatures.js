

export class ApiFeatures {

    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

// pagination  
    pagination(){
    let page = this.queryString.page * 1 || 1
    if (this.queryString.page <= 0) page = 1
    let skip = (page - 1) * 5
    this.page = page
    this.mongooseQuery.skip(skip).limit(5)
    return this
    }

// filtration
    filtration(){
    let filtration = {...this.queryString }
    let excludedQuery = ['page','sort','fields','keyword']
    excludedQuery.forEach((ele) => {
        delete filtration[ele]
    })
        // console.log(filtration)
        filtration = JSON.stringify(filtration) // to string
        filtration = filtration.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filtration = JSON.parse(filtration)
        this.mongooseQuery.find(filtration)
        return this;
    }

    // sort
    sorting(){
    if (this.queryString.sort){
        // console.log(this.queryString.sort)
        let sortedBy = this.queryString.sort.split(',').join(' ')
        // console.log(sortedBy)
        this.mongooseQuery.sort(sortedBy)
    }
    return this
    }

    // search 
    searching(){
    if (this.queryString.keyword){
        this.mongooseQuery.find(
            {
            $or :
             [
                 {title : {$regex: this.queryString.keyword , $options: 'i'} },
                {description : {$regex: this.queryString.keyword , $options: 'i'}}
            ]
        })
    }
    return this
    }

    // selected fields
    fields(){
        if (this.queryString.fields){
            // console.log(req.query.fields)
            let fields = this.queryString.fields.split(',').join(' ')
            // console.log (fields)
            this.mongooseQuery.select(fields)
        }
    return this
    }
}