<?php

namespace Feston\AperitifBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Feston\AperitifBundle\Entity\User;

class UserController extends FOSRestController
{
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $name = $request->request->get('name', null);
        if ($name !== null) {
            $user = new User($name);
            $em->persist($user);
            $em->flush();
            $data = array(
                'id' => $user->getId(),
                'created' => $user->getCreated(),
            );
            $view = $this->view($data, 200);
        } else {
            $data = array('msg' => "Name can't be null.");
            $view = $this->view($data, 400);
        }

        return $this->handleView($view);
    }
}
