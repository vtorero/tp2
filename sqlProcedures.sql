USE [inspeccion]
GO
/****** Object:  StoredProcedure [dbo].[SP_BUSCA_PROYECTO]    Script Date: 07/04/2018 18:29:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[SP_BUSCA_PROYECTO]
@nombreProyecto varchar(50) =null,
@estado varchar(50) = null,
@codigo int =null
AS BEGIN
If(@nombreProyecto is not null)
 BEGIN
SELECT * FROM dbo.proyecto p WHERE nombreProyecto like '%'+ @nombreProyecto+ '%';
END
if(@estado is not null)
 BEGIN
SELECT * FROM dbo.proyecto p WHERE estado=@estado;
END
if(@codigo is not null)
 BEGIN
SELECT * FROM dbo.proyecto p WHERE codProyecto=@codigo;
END
END


USE [inspeccion]
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_PROYECTO]    Script Date: 07/04/2018 18:29:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[SP_OBTENER_PROYECTO]
AS BEGIN
SELECT TOP 1000 [codProyecto]
      ,[nombreProyecto]
      ,[fechaInicio]
      ,[fechaFin]
      ,[estado]
      ,[fechaCreacion]
      ,[usuarioCreacion]
      ,[jefeProyecto]
  FROM [inspeccion].[dbo].[proyecto]
  END;
