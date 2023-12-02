import React from "react";
import { Avatar, Col, Row } from "antd";
import "./home.scss";
const Home = () => {
  return (
    <div className="home-container">
      <Row gutter={[16, 16]}>
        <Col span={12} className="home-section">
          <h1 className="home-brand">EL FRONT D3V</h1>
          <h3 className="home-description">
            Controla tus finanzas de manera inteligente y sencilla con nuestra
            aplicación diseñada para ayudarte a administrar tus ingresos,
            gastos, préstamos y metas financieras. Con "el front d3v", tomar el
            control de tu dinero nunca ha sido tan fácil.
          </h3>
        </Col>
        <Col span={12}>Imagen aquí</Col>

        <Col span={12} className="home-section center">
          <h1 className="home-title">Beneficios Destacados</h1>
        </Col>
        <Col span={12} className="home-section">
          <h3 className="home-description ">
            <b>Organización Financiera:</b> Lleva un registro claro y detallado
            de tus ingresos y egresos. Nuestro dashboard intuitivo te
            proporcionará una visión completa de tu situación financiera en
            tiempo real.
          </h3>
          <h3 className="home-description ">
            <b>Planificación Efectiva:</b> Establece metas financieras y realiza
            un seguimiento de tu progreso. Desde ahorrar para un viaje hasta
            pagar deudas, "el front d3v" te ayudará a alcanzar tus objetivos.
          </h3>
          <h3 className="home-description ">
            <b>Autenticación Segura:</b> Nuestra aplicación utiliza Firebase
            Authentication, lo que garantiza la máxima seguridad para tus datos
            financieros. Puedes estar tranquilo sabiendo que tu información está
            protegida.
          </h3>
        </Col>
        <Col span={24} className="home-section">
          <h1 className="home-title center">Como funciona?</h1>
          <div className="home-repeat-section">
            <h3 className="home-repeat-element">
              <b>Regístrate</b> <br /> Crea una cuenta gratuita con "el front
              d3v" en cuestión de segundos. Puedes utilizar tu correo
              electrónico o iniciar sesión con tu cuenta de Google o Facebook.
            </h3>
            <h3 className="home-repeat-element">
              <b>Personaliza tu perfil</b> <br /> Agrega una foto de perfil y
              ajusta tus preferencias para que la aplicación se adapte a ti.
            </h3>
            <h3 className="home-repeat-element">
              <b>Controla tus Finanzas</b> <br /> Ingresa tus ingresos y egresos
              fácilmente. Observa cómo nuestras herramientas analíticas
              presentan tus datos financieros en gráficos interactivos y
              reportes detallados.
            </h3>
            <h3 className="home-repeat-element">
              <b>Tareas y Recordatorios</b> <br /> Mantén tus finanzas en orden
              con la opción de agregar tareas y recordatorios para pagar
              facturas o realizar transacciones importantes.
            </h3>
            <h3 className="home-repeat-element">
              <b>Siempre a tu Alcance</b> <br /> Accede a "el front d3v" desde
              cualquier dispositivo, ya sea tu computadora, tableta o
              smartphone.
            </h3>
          </div>
        </Col>
        <Col span={12}>
          <h1>¿Quién desarrolló "el front d3v"?</h1>
          <Avatar />
        </Col>
        <Col span={12}>
          <h1>Portafolio</h1>
          <h1>imagen con portafolio</h1>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
