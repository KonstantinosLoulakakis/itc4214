$(document).ready(function() {
    let products = [];

    // Adds the elements to the table when the button is pressed
    $('#addForm').on('submit', function(e) {
        e.preventDefault();  //makes it so that the table is filled with the input of the user instead of the actual submission button function
        let productName = $('#productName').val();
        let productType = $('#productType').val();

        if (productName && productType) {
            products.push({ name: productName, type: productType });
            renderTable();
            $('#productName').val('');
            $('#productType').val('');
        }
    });

        //sorts the products inside the rows in alphabetical order 
        $('#sortbyname').on('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
    
            var rows = $('#productTable tbody tr').get();
    
            rows.sort(function(a, b) {
                var A = $(a).children('td').eq(0).text().toUpperCase();
                var B = $(b).children('td').eq(0).text().toUpperCase();
    
                if(A < B) {
                    return -1;
                }
                if(A > B) {
                    return 1;
                }
                return 0;
            });
    
            $.each(rows, function(index, row) {
                $('#productTable').children('tbody').append(row);
            });
        });
    
    

    // Delete the elements from the table when pressing the delete button
    $('#productTable').on('click', '.delete-btn', function() {
        let index = $(this).data('index'); //$(this) is the event handler, in this case its the delete-btn clicked
        products.splice(index, 1);
        renderTable();
    });

    // Renders the table
    function renderTable() {
        let tbody = $('#productTable tbody');
        tbody.empty();
        products.forEach((product, index) => {  //product is the current ellement, index is the index of the product in the array
            tbody.append(`<tr>
                <td>${product.name}</td> 
                <td>${product.type}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td> 
            </tr>`); //the button is created with an index "following" each product inside the table
        });
    }

    // Dark mode toggle
    $('#darkModeToggle').on('click', function() {
        $('body').toggleClass('dark-mode');
    });

    // Contact form submission in order to show on screen after submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        let username = $('#username').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let message = $('#message').val();

        alert(`Message from ${username} (${email}, ${phone}): ${message}`);
        $('#contactForm')[0].reset();
    });
});
