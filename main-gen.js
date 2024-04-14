(async function main() {
    var SimEntry = null;
    var acct = null;
    var sim = null;
  
    [ { SimEntry }, {SimEntryConstants} ] = await Promise.all( [
                      import('/SimEntry.js'),
                      import('/SimEntryConstants.js'),
                      import('/SimEntryElement.js')
                    ] );
    
    var data = {
        entries: [
            {
                token: "const",
                name: "environment",
                Label: "Environment Constants",
                values: [
                    { name: "inflation", value: 0.03 }
                ]
            }
        ]
    };

    let entries = SimEntry.createFromList(data.entries);

    let sample= document.getElementById("account-sample");

    sample.bindEntry(entries[0]);
})()