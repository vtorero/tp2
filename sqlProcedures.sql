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

/******tablas*****/

USE [inspeccion]
GO

/****** Object:  Table [dbo].[proyecto]    Script Date: 07/04/2018 18:30:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[proyecto](
	[codProyecto] [int] IDENTITY(1,1) NOT NULL,
	[nombreProyecto] [varchar](50) NULL,
	[fechaInicio] [date] NULL,
	[fechaFin] [date] NULL,
	[estado] [varchar](50) NULL,
	[fechaCreacion] [date] NULL,
	[usuarioCreacion] [varchar](50) NULL,
	[jefeProyecto] [varchar](50) NULL,
 CONSTRAINT [PK_proyecto] PRIMARY KEY CLUSTERED 
(
	[codProyecto] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

