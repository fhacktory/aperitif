<?php

namespace Feston\AperitifBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Feston\AperitifBundle\Entity\Semaphore;

class SemaphoreController extends FOSRestController
{
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $username = $request->request->get('username', null);
        $location = $request->request->get('location', 'not provided');

        if ($username !== null) {
            $semaphore = new Semaphore($username, $location);
            $em->persist($semaphore);
            $em->flush();
            $data = array(
                'created' => $semaphore->getCreated(),
                'privateId' => $semaphore->getPrivateId(),
                'publicId' => $semaphore->getPublicId(),
            );
            $view = $this->view($data, 200);
        } else {
            $data = array('msg' => "Username can't be null.");
            $view = $this->view($data, 400);
        }

        return $this->handleView($view);
    }
}
