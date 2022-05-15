$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateProjectForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidProjectIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "paymentAPI",
		type : type,
		data : $("#formpayment").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onProjectSaveComplete(response.responseText, status);
		}
	});
});

function onProjectSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();

			$("#divProjectGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidProjectIDSave").val("");
	$("#formpayment")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidProjectIDSave").val(
					$(this).closest("tr").find('#hidProjectIDUpdate').val());
			$("#accNo").val($(this).closest("tr").find('td:eq(0)').text());
			$("#nameOnCard").val($(this).closest("tr").find('td:eq(1)').text());
			$("#cardNo").val($(this).closest("tr").find('td:eq(2)').text());
			$("#cvv").val($(this).closest("tr").find('td:eq(3)').text());
			$("#expireDate").val($(this).closest("tr").find('td:eq(4)').text());
		});

// REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "paymentAPI",
		type : "DELETE",
		data : "id=" + $(this).data("payid"),
		dataType : "text",
		complete : function(response, status) {
			onProjectDeleteComplete(response.responseText, status);
		}
	});
});

function onProjectDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {

			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();

			$("#divProjectGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENT-MODEL=========================================================================
function validateProjectForm() {
	
	
	var tmpaccNo = $("#accNo").val().trim();
	 if (!$.isNumeric(tmpaccNo)) 
	 {
		 return "Insert Acc No";
	 }

	
	if ($("#nameOnCard").val().trim() == "") {
		return "Insert Name ON Card.";
	}
	
	 var tmpcardNo = $("#cardNo").val().trim();
	 if (!$.isNumeric(tmpcardNo)) 
	 {
		 return "Insert Card No";
	 }
	 
	 var tmpcvv = $("#cvv").val().trim();
	 if (!$.isNumeric(tmpcvv)) 
	 {
		 return "Insert cvv";
	 }

	
	if ($("#expireDate").val().trim() == "") {
		return "Insert Expire Date";
	}

	
	 


	return true;
}