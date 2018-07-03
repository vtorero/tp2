﻿let $ = require('jquery');
let confirm = require('jquery-confirm');
var tblAsignacion = null;
var tblAccesorioDev = null;
$(document).ready(function () {
    llenarTabla();
});

$("#btnAgregar").click(function () {
    var url = $("#AgregarEditar").val();
    window.location.href = url + '?id=0&accion=0';
});

$("#btnBuscar").click(function () {
    var proyecto = $('#txtProyecto').val();
    console.log(proyecto);
    var entidad = {};
    entidad.nombreProyecto = proyecto;
    console.log(entidad);
    $.ajax({
        type: 'POST',
        data:entidad,
        url: 'http://localhost:9586/api/Asignar/ListadoProyectos',
        dataType: 'json', contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            output = ' <table id="example1" class="table table-bordered table-striped" width="100%">';
            output += '<thead><tr><th>Código</th><th>Proyecto</th><th>Fecha inicio</th><th>Fecha Fin</th><th>Estado</th><th>Operaciones</th></tr></thead><tbody>';

        console.log("datax", data);
            for (var i in data) {

                output += '<tr><th scope="row">' + data[i].codProyecto + '</th><td>' + data[i].nombreProyecto + '</td><td>' + data[i].fechaInicio.substring(0, 10) + '</td><td>' + data[i].fechaFin.substring(0, 10) + '</td><td>' + data[i].estado + '</td></tr>';
                //console.log(data[i].DEPA_DESCRIPCION);

            }
            $('#resultado').html(output);




        }
    });
});

function llenarTabla2() {

    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:9586/api/Asignar/ListarDepartamento',
        dataType: 'json', contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            output = '<table class="table"><thead><tr><th scope="col">codigo</th><th scope="col">Tipo</th><th scope="col">nombre</th></tr></thead><tbody>';
            
            console.log("datax", data);
            for (var i in data) {

                output += '<tr><th scope="row">' + (parseFloat(i) + 1) + '</th><td>' + data[i].DEPA_DESCRIPCION + '</td><td>' + data[i].DEPA_CODREF + '</td></tr>';
                //console.log(data[i].DEPA_DESCRIPCION);

            }
            $('#tblAsignacion').html(output);

            


        }
    });



}

function llenarTabla2() {
    tblAsignacion = $("#tblAsignacion")
        .dataTable({
            "bLengthChange": false,
            "bFilter": false,
            "PaginationType": "full_numbers",
            "processing": true,
            "bServerSide": true,
            "sAjaxSource": $("#UrlServicio").val() + '/api/Asignar/ListadoEmpleados',
            "select": true,
            "pageLength": 10,
            responsive: true,
            language: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            "fnServerData": function (url, odata, callback) {
                //debugger;
                var entidad = {};
                var PageSize = 2;
                var PrimerRegistro = odata[3].value;
                var CurrentPage = PrimerRegistro / PageSize;

                entidad.piPageSize = PageSize;
                entidad.iCurrentPage = CurrentPage + 1;
                entidad.pvSortColumn = "idEmpleado";
                entidad.pvSortOrder = "DESC";
               


                $.ajax({
                    "url": url,
                    "dataSrc": "",
                    "data": entidad,
                    "success":
                        function (response) {
                            console.log(response);
                            if (response.lenght == 0) {
                                callback({
                                    data: response,
                                    recordsTotal: 0,
                                    recordsFiltered: 0,

                                })
                            } else {
                                callback({
                                    data: response,
                                    recordsTotal: response[0].iTotalRecords,
                                    recordsFiltered: response[0].iTotalRecords,
                                    //recordsFiltered: response[0].iTotalDisplayRecords,

                                })
                            };

                            $(".ver").click(function () {
                                var id = $(this).data("id");
                                var url = $("#AgregarEditar").val();
                                window.location.href = url + '?id=' + id + '&accion=0';
                            });

                            $(".devolucion").click(function () {
                                var id = $(this).data("id");
                                var url = $("#AgregarEditar").val();
                                window.location.href = url + '?id=' + id + '&accion=1';
                                
                            });

                            $(".reposicion").click(function () {

                                debugger;
                                var id = $(this).data("id");
                                var entidad = {};
                                entidad.idCodAsignacion = id;
                                entidad.iUsuarioRegistro = $("#iCodUsuario").val();
                                entidad.iOpcion = 5;

                                $.ajax({
                                    "url": $("#UrlServicio").val() + '/api/Asignar/AsignacionCRUD',
                                    "dataSrc": "",
                                    "data": entidad,
                                    "success":
                                        function (response) {
                                            $("#tblAsignacion").dataTable().api().ajax.reload();

                                        },
                                    "contentType": "application/x-www-form-urlencoded; charset=utf-8",
                                    "dataType": "json",
                                    "type": "POST",
                                    "cache": false,
                                    "error": function (resultado) {
                                        console.log(resultado);
                                        alert("DataTables warning: JSON data from server failed to load or be parsed. " +
                                            "This is most likely to be caused by a JSON formatting error.");
                                    },
                                });
                            });

                            $(".reimpresionasig").click(function () {
                                var id = $(this).data("id");
                                var entidad_ = {}
                                entidad_.idCodAsignacion = id; 
                                $.ajax({
                                    url: $('#UrlServicio').val() + "/api/asignar/GenerarFormatoAsignacion",
                                    data: entidad_,
                                    dataType: 'json',
                                    type: "post",
                                    success: function (resultado) {
                                        console.log(resultado);
                                        Base64ToFile(resultado);
                                    },
                                    error: function (xhr, status, error) {

                                    }
                                });
                            });

                            $(".reimpresiondev").click(function () {
                                var id = $(this).data("id");
                                var entidad_ = {}
                                entidad_.idCodAsignacion = id; 
                                $.ajax({
                                    url: $('#UrlServicio').val() + "/api/asignar/GenerarFormatoDevolucion",
                                    data: entidad_,
                                    dataType: 'json',
                                    type: "post",
                                    success: function (resultado) {
                                        console.log(resultado);
                                        Base64ToFile(resultado);
                                    },
                                    error: function (xhr, status, error) {

                                    }
                                });
                            });

                            $(".eliminar").click(function () {
                                var id = $(this).data("idCodAsignacion");
                                $.confirm({
                                    title: 'Confirmación!',
                                    content: 'Esta seguro que desea elimiar este registro',
                                    type: 'red',
                                    animation: 'zoom',
                                    buttons: {
                                        Ok: function () {
                                            $.ajax({
                                                type: 'POST',
                                                url: $("#UrlServicio").val() + '/api/papeleta/EliminarPapeleta',
                                                dataType: 'json',
                                                data: { idCodAsignacion: id },
                                                cache: false,
                                                success: function (aData) {
                                                    location.reload();
                                                },
                                                error: function () { alert("Connection Is Not Available"); }
                                            });
                                        },
                                        cancelar: function () {
                                        }
                                    }
                                });
                            });
                    },
                    "contentType": "application/x-www-form-urlencoded; charset=utf-8",
                    "dataType": "json",
                    "type": "POST",
                    "cache": false,
                    "error": function (resultado) {
                        console.log(resultado);
                        alert("DataTables warning: JSON data from server failed to load or be parsed. " +
                            "This is most likely to be caused by a JSON formatting error.");
                    },
                });
            },

            "aoColumns": [
                { "title": "id", "bSortable": false, bVisible: false, "data": "idEmpleado" },
                { "title": "Apellidos", "bSortable": false, "data": "Apellidos" },
                { "title": "Nombres", "bSortable": false, "data": "Nombres" },
               

            ],
            "columnDefs": [

            ]
        });
}


function llenarTablaAccesorio(){
    tblAccesorioDev = $("#tblAccesorioDev")
        .DataTable({
            "bLengthChange": false,
            "bFilter": false,
            "PaginationType": "full_numbers",
            "processing": true,
            "bServerSide": true,
            "sAjaxSource": $("#UrlServicio").val() + '/api/Asignar/ObtenerAccesorioPorIMEI',
            "select": true,
            "pageLength": 20,
            responsive: true,
            language: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            "fnServerData": function (url, odata, callback) {
                //debugger;
                entidad = {};
                //var PageSize = 10;
                //var PrimerRegistro = 0;
                //var CurrentPage = PrimerRegistro / PageSize;

                //entidad.iPageSize = PageSize;
                //entidad.iCurrentPage = CurrentPage + 1;
                //entidad.vSortColumn = "iCodVisita";
                //entidad.vSortOrder = "DESC";
                entidad.IMEI = $("#txtNroIMEIDev").val();
                //entidad.vNroDocVisitante = $("#txtNroDocVisitante").val();
                //entidad.vCodigoBarra = $("#txtCodigoBarra").val();


                $.ajax({
                    "url": url,
                    "dataSrc": "",
                    "data": entidad,
                    "success":
                        function (response) {
                            //debugger;
                            console.log(response);
                            if (response.length == 0) {
                                callback({
                                    data: response,
                                    recordsTotal: 0,
                                    recordsFiltered: 0,

                                })
                            } else {
                                callback({
                                    data: response,
                                    recordsTotal: response[0].iTotalRecords,
                                    recordsFiltered: response[0].iTotalRecords,

                                })
                            };

                            $(".ver").click(function () {
                                var id = $(this).data("id");
                                var url = $("#AgregarEditar").val();
                                window.location.href = url + '?id=' + id + '&accion=1&iCodUsuario=' + iCodUsuario;
                            });

                            $(".editar").click(function () {
                                var id = $(this).data("id");
                                var url = $("#AgregarEditar").val();
                                window.location.href = url + '?id=' + id + '&accion=2&iCodUsuario=' + iCodUsuario;
                            });

                            $(".eliminar").click(function () {
                                id = $(this).data("id");
                                entidad = {};
                                entidad.idCodEquipoDet = id;
                                entidad.iOpcion = 3;

                                $.confirm({
                                    title: 'Confirmación!',
                                    content: 'Esta seguro que desea elimiar este registro',
                                    type: 'red',
                                    animation: 'zoom',
                                    buttons: {
                                        Ok: function () {
                                            $("#modalEliminar").modal().show();
                                        },
                                        cancelar: function () {
                                        }
                                    }
                                });
                            });
                        },
                    //,
                    "contentType": "application/x-www-form-urlencoded; charset=utf-8",
                    "dataType": "json",
                    "type": "POST",
                    "cache": false,
                    "error": function (resultado) {
                        console.log(resultado);
                        alert("DataTables warning: JSON data from server failed to load or be parsed. " +
                            "This is most likely to be caused by a JSON formatting error.");
                    },
                });
            },

            "aoColumns": [
                { "title": "idCodEquipoDet", "bSortable": false, bVisible: false, "data": "idCodEquipoDet" },
                { "title": "idCodAccesorio", "bSortable": false, bVisible: false, "data": "idCodAccesorio" },
                { "title": "vAccesorio", "bSortable": false, "data": "vAccesorio" },
                { "title": "Estado", "bSortable": false, "data": "Estado" },
                { "title": "cEstado", "bSortable": false, bVisible: false, "data": "cEstado" },
                { "title": "Acciones", "bSortable": false, bVisible: true, "data": "vAcciones" },
            ],
            "columnDefs": [

            ]
        });
}

$("#txtNroDocResponsable").keyup(function () {
    $("#tblAsignacion").dataTable().api().ajax.reload(); 
});

$("#txtNombreResponsable").keyup(function () {
    $("#tblAsignacion").dataTable().api().ajax.reload();
});

$("#txtNroCelular").keyup(function () {
    $("#tblAsignacion").dataTable().api().ajax.reload();
});

$("#txtNroDocPosecion").keyup(function () {
    $("#tblAsignacion").dataTable().api().ajax.reload();
});

$("#txtNombrePosecion").keyup(function () {
    $("#tblAsignacion").dataTable().api().ajax.reload();
});

$("#ddlEstado").change(function () {
    $("#tblAsignacion").dataTable().api().ajax.reload();
});


function CargarInformacion(id) {
   
    var entidad = {}
    entidad.idCodAsignacion = id;
    $.ajax({
        "url": $("#UrlServicio").val() + '/api/Asignar/ObtenerAsignacionPorId',
        "dataSrc": "",
        "data": entidad,
        "success":
            function (response) {
                //debugger;
                //$("#txtApePaternoAsigDev").val(response.vApePatEncargado)
                //$("#txtApeMaternoAsigDev").val(response.vApeMatEncargado);
                //$("#txtNombreAsignadoDev").val(response.vNombreEncargado);
                //$("#txtDniAsignadoDev").val(response.vNroDocEncargado);

                $("#txtApePaternoRespDev").val(response.vApePatResponsable);
                $("#txtApeMaternoRespDev").val(response.vApeMatResponsable);
                $("#txtNombreResponsableDev").val(response.vNombreResponsable);
                $("#txtDniResponsableDev").val(response.vNroDocRepsonsable);

                $("#txtNroCelularDev").val(response.vNroCelular);
                $("#txtGigasDev").val(response.dCantidadGigas);
                $("#txtMinutosDev").val(response.dCantidadMinutos);
                $("#txtMsjDev").val(response.dCantidadMsj);
                $("#txtNroIMEIDev").val(response.vIMEI);
                $("#txtMarcaDev").val(response.vMarca);
                $("#txtModeloDev").val(response.vModelo);
                $("#txtEstadoDev").val(response.cEstado);
                $("#txtPlanDev").val(response.vPlan);
                

                $("#modalDevoluvion").modal().show();
                //$("#classModal").modal().show();                
                
            },
        "contentType": "application/x-www-form-urlencoded; charset=utf-8",
        "dataType": "json",
        "type": "POST",
        "cache": false,
        "error": function (resultado) {
            console.log(resultado);
            alert("DataTables warning: JSON data from server failed to load or be parsed. " +
                "This is most likely to be caused by a JSON formatting error.");
        },
    });
}

$('#modalDevoluvion').on('shown.bs.modal', function (e) {
    //debugger;
    $("#divTableAccesorio").html('<table id="tblAccesorioDev" class="table table-bordered" cellspacing="0" />');
    if ($.fn.DataTable.isDataTable('#tblAccesorioDev')) {
        //$('#example').dataTable();
        tblAccesorioDev.destroy();
    }
    llenarTablaAccesorio();
    //$("#tblAccesorioDev").dataTable().api().ajax.reload();
})

$('#modalDevoluvion').on('hidden.bs.modal', function (e) {
    //debugger;
    tblAccesorioDev.destroy();
    $('#tblAccesorioDev').html('');
})
