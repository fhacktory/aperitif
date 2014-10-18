<?php

namespace Feston\AperitifBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Feston\AperitifBundle\Entity\Aperitif;

class AperitifController extends FOSRestController
{
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();
        $aperitifs = $em->getRepository('FestonAperitifBundle:Aperitif')->findAll();

        $data = array();
        foreach ($aperitifs as $aperitif) {
            $data[] = array(
                'created' => $aperitif->getCreated(),
                'publicId' => $aperitif->getPublicId(),
                'username' => $aperitif->getUsername(),
                'location' => $aperitif->getLocation(),
            );
        }

        $view = $this->view($data, 200);

        return $this->handleView($view);
    }

    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $username = $request->request->get('username', null);
        $location = $request->request->get('location', 'not provided');

        if ($username !== null) {
            $aperitif = new Aperitif($username, $location);
            $em->persist($aperitif);
            $em->flush();
            $data = array(
                'created' => $aperitif->getCreated(),
                'id' => $aperitif->getId(),
            );
            $view = $this->view($data, 200);
        } else {
            $data = array('msg' => "Username can't be null.");
            $view = $this->view($data, 400);
        }

        return $this->handleView($view);
    }
}
