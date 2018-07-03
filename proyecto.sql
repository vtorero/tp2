USE [inspeccion]
GO

INSERT INTO [dbo].[proyecto]
           ([nombreProyecto]
           ,[fechaInicio]
           ,[fechaFin]
           ,[estado]
           ,[fechaCreacion]
           ,[usuarioCreacion])
     VALUES
           (<nombreProyecto, varchar(50),>
           ,<fechaInicio, date,>
           ,<fechaFin, date,>
           ,<estado, varchar(50),>
           ,<fechaCreacion, date,>
           ,<usuarioCreacion, varchar(50),>)
GO

