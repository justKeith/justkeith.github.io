(async function main() {
    var SimEntry = null;
    var acct = null;
    var sim = null;
  
    [ { SimEntry }, {SimEntryConstants} ] = await Promise.all( [
                      import('/SimEntry.js'),
                      import('/SimEntryConstants.js')
                    ] );
    
    var data = {
        entries: [
            {
                token: "const",
                name: "environment",
                values: [
                    { name: "inflation", value: 0.03 }
                ]
            }
        ]
    };

    console.log( SimEntry.createFromList(data.entries) );
})()