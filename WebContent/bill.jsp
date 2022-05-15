<%@page import="com.payment" %>
    <%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>

        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="ISO-8859-1">
            <title>Bill Service</title>
            <link rel="stylesheet" href="Views/bootstrap.min.css">
            <script src="Components/jquery-3.4.1.min.js"></script>
            <script src="Components/payment.js"></script>
        </head>

        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h1>Bill Service</h1>

                        <form id="formpayment" name="formpayment" method="post" action="payment.jsp">


                            Bill ID: <input id="accNo" name="accNo" type="text" class="form-control form-control-sm">

                            <br>Acc No: <input id="nameOnCard" name="nameOnCard" type="text" class="form-control form-control-sm">

                            <br> Name On Card: <input id="cardNo" name="cardNo" type="text" class="form-control form-control-sm">

                            <br> Card No: <input id="cvv" name="cvv" type="text" class="form-control form-control-sm">

                            <br> Expire Date: <input id="expireDate" name="expireDate" type="date" class="form-control form-control-sm">

                            <br> Cvv: <input id="expireDate" name="expireDate" type="date" class="form-control form-control-sm">

                            <br> <input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
                            <input type="hidden" id="hidProjectIDSave" name="hidProjectIDSave" value="">
                        </form>

                        <div id="alertSuccess" class="alert alert-success"></div>
                        <div id="alertError" class="alert alert-danger"></div>

                        <br>
                        <div id="divProjectGrid">
                            <% payment projectObj=new payment(); out.print(projectObj.readProject()); %>
                        </div>
                    </div>
                </div>
            </div>
        </body>

        </html>