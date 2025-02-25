/* Home.js
   Inserts a single paragraph with text "Hello from OOXML!" at the end of the document.
*/

let messageBanner;

// The initialize function must be run each time a new page is loaded.
Office.onReady(() => {
    $(document).ready(() => {
        // Set up the Office Fabric UI message banner
        const element = document.querySelector('.MessageBanner');
        messageBanner = new components.MessageBanner(element);
        messageBanner.hideBanner();

        // Wire up the button
        $('#insert-ooxml-button').click(insertPlainOOXML);
    });
});

/**
 * Inserts a plain paragraph of text using valid OOXML.
 */
async function insertPlainOOXML() {
    try {
        await Word.run(async (context) => {
            // A minimal OOXML snippet with NO math tags, just text.
            const myOOXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:r>
    <w:t>Hello from OOXML!</w:t>
  </w:r>
</w:p>`;

            // Insert this snippet at the end of the document
            context.document.body.insertOoxml(myOOXML, Word.InsertLocation.end);
            await context.sync();

            showNotification("Success!", "Inserted a plain OOXML paragraph.");
        });
    } catch (error) {
        errorHandler(error);
    }
}

function errorHandler(error) {
    console.error("Error:", error);
    showNotification("Error", error.message || JSON.stringify(error));
}

function showNotification(title, message) {
    $("#notification-header").text(title);
    $("#notification-body").text(message);
    messageBanner.showBanner();
    messageBanner.toggleExpansion();
}
