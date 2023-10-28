<template>
	<div class="super-container">
		<p class="title-principal">
			Políticas de privacidad de Predix.ec
		</p>
		<div class="container">
			<p class="container-text">
				Predix.ec ("Nosotros" o "Nuestra Empresa") valora la privacidad de 
				sus usuarios y se compromete a proteger y gestionar adecuadamente
				la información personal recopilada durante el uso de nuestros 
				servicios. Al acceder y utilizar nuestros servicios, usted acepta esta 
				Política de Privacidad
			</p>
			<p class="title">Recopilación de datos personales</p>
			<p class="container-text">
				Para ofrecer nuestros servicios de pronósticos deportivos y garantizar 
				la legalidad y seguridad de los mismos, Predix.ec recopila y almacena
				ciertos datos personales. Los datos recopilados pueden incluir:
				<ul class="container-text-list">
					<li>Nombre y Apellidos</li>
					<li>Dirección (incluido el país de residencia)</li>
					<li>Fecha de nacimiento (debe ser mayor de edad)</li>
					<li>Sexo</li>
					<li>Dirección de correo electrónico</li>
					<li>Datos de identificacón declarados por el cliente cuando se abre cuentas de juego o solicitud de las credenciales de acceos a los juegos en línea</li>
				</ul>
			</p>
			<p class="title">Uso de datos personales</p>
			<p class="container-text">
				Los datos personales recopilados se utilizan para los siguientes fines.
				<ul class="container-text-list">
					<li>Creación y gestión de cuentas de usuario</li>
					<li>Facilitar el acceso a los pronósticos deportivos diarios</li>
					<li>Procesar pagos de suscripción y gestionar la facturación</li>
					<li>Cumplir con los requisitos legales y de seguridad</li>
					<li>Comunicación con los usuarios con referencia al servicio y la atención al cliente</li>
					<li>Mejora de nuestros servicios y ofertas basadas en las preferencias y comportamiento de los usuarios</li>
				</ul>
			</p>
			<p class="title">Seguridad de datos</p>
			<p class="container-text">
				Predix.ec toma medidas de seguridad adecuadas para proteger la 
				información personal de los usuarios. Sin embargo, es importante 
				tener en cuenta que ningún sistema en línea es completamente 
				seguro, y no podemos garantizar la seguridad absoluta de los datos.
			</p>
			<p class="title">Compartir datos personales</p>
			<p class="container-text">
				Predix.ec no comparte ni vende información personal de los usuarios 
				con terceros, excepto cuando sea necesario para cumplir con 
				obligaciones legales, prevenir el lavado de dinero o proteger nuestros
				derechos y activos.
			</p>
			<p class="title">Derecho de acceso y rectificación</p>
			<p class="container-text">
				Los usuarios tienen derecho a acceder, rectificar o eliminar sus datos 
				personales. Para ejercer estos derechos o hacer preguntas sobre la 
				privacidad, los usuarios pueden ponerse en contacto con nuestro 
				servicio de atención al cliente.
			</p>
			<p class="title">Lavado de dinero</p>
			<p class="container-text">
				De acuerdo con las directrices internacionales para la prevención del 
				blanqueo de capitales, Predix.ec utilizará todos los medios a su 
				alcance para identificar cualquier intento de blanquear dinero, 
				participando cuando sea necesario con la comunicación inmediata 
				con las autoridades competentes.
			</p>
			<p class="title">Contacto</p>
			<p class="container-text">
				Para preguntas o preocupaciones relacionadas con esta Política de 
				Privacidad, por favor póngase en contacto con nuestro servicio de 
				atención al cliente a través de info.predix@gmail.com
				Gracias por confiar en Predix.ec. Estamos comprometidos a proteger 
				su privacidad y brindar un servicio de calidad. Esta Política de 
				Privacidad refleja nuestro compromiso con la privacidad y la 
				seguridad de los datos.
			</p>
			<p class="title">Cambios en la políticas</p>
			<p class="container-text">
				Predix.ec se reserva el derecho de modificar esta Política de 
				Privacidad y los Términos y Condiciones en cualquier momento. Los 
				usuarios serán notificados de cualquier cambio en estas políticas y 
				términos a través de una notificación en la sección correspondiente 
				de nuestro sitio web. Se recomienda a los usuarios revisar 
				periódicamente esta sección para estar al tanto de cualquier 
				actualización. El uso continuado de nuestros servicios después de la 
				publicación de cambios implica la aceptación de las políticas y 
				términos actualizados
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.title-principal {
  font-size: $h2-font-size;
  font-weight: 700;
  font-family: $font-secondary;
  padding: 16px;
}

.title {
  font-size: $h2-font-size;
  font-weight: 700;
  font-family: $font-secondary;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;

  &-text {
    font-family: $font-secondary;
    font-size: $body-font-size;
		&-list {
			color: white;
			font-size: $body-font-size;
		}
    a {
      font-weight: 700;
      color: $white;
    }
  }
}
</style>
